import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStatus } from './interfaces/status.interface';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel('status')
    private statusModel:Model<IStatus>
  ){}
  async createstatus(createStatusDto: CreateStatusDto):Promise<IStatus> {
    const newstatus=new this.statusModel(createStatusDto)
    return newstatus.save() 
  }

  async getallstatus():Promise<IStatus[]>{
    const statusData= await this.statusModel.find()
    if(!statusData||statusData.length==0){
      throw new NotFoundException('Status data not found')
    }
    return statusData
  }

  async getstatus(statusId: string) {
    const existingstatus=await this.statusModel.findById(statusId).exec()
    if(!existingstatus){
      throw new NotFoundException(`Status with id ${statusId} not found`)
    }
    return existingstatus
  }

  async updatestatus(statusId: string, UpdateStatusDto: UpdateStatusDto) {
    const existingstatus=await this.statusModel.findByIdAndUpdate(statusId,UpdateStatusDto,{new:true})
      if(!existingstatus){
        throw  new NotFoundException(`Status with id ${statusId} not found`)
      }
      return existingstatus
    }
  
    async deletestatus(statusId: string) {
     const deletedstatus=await this.statusModel.findByIdAndDelete(statusId)
     if(!deletedstatus){
      throw new NotFoundException(`Status with Id ${statusId} not found`)
     }
     return deletedstatus
    }
  }

