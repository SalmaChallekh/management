import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSituationprofDto } from './dto/create-situationprof.dto';
import { UpdateSituationprofDto } from './dto/update-situationprof.dto';
import { ISituationprof } from './interfaces/situationprof.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SituationprofService {
  constructor(
    @InjectModel('situationprof')
    private situationprofModel:Model<ISituationprof>
  ){}
  async createsituation(createSituationprofDto: CreateSituationprofDto):Promise<ISituationprof> {
    const newsituation=new this.situationprofModel(createSituationprofDto)
    return newsituation.save()
  }
  
  async getallsituation():Promise<ISituationprof[]>{
    const situationData= await this.situationprofModel.find()
    if(!situationData||situationData.length==0){
      throw new NotFoundException('situations data not found')
    }
    return situationData
  }

  async getsituation(situationprofId: string) {
    const existingsituation=await this.situationprofModel.findById(situationprofId).exec()
    if(!existingsituation){
      throw new NotFoundException(`Situation with id ${situationprofId} not found`)
    }
    return existingsituation
  }

  async updatesituation(situationprofId: string, updateSituationprofDto: UpdateSituationprofDto) {
    const existingsituation=await this.situationprofModel.findByIdAndUpdate(situationprofId,updateSituationprofDto,{new:true})
      if(!existingsituation){
        throw  new NotFoundException(`Situation with id ${situationprofId} not found`)
      }
      return existingsituation
    }

    async deletesituation(situationprofId: string) {
      const deletedsituation=await this.situationprofModel.findByIdAndDelete(situationprofId)
      if(!deletedsituation){
       throw new NotFoundException(`Situation with Id ${situationprofId} not found`)
      }
      return deletedsituation
  }
}
