import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { IManager } from './interfaces/manager.interface';
import { Model } from 'mongoose';
@Injectable()
export class ManagersService {
  constructor(
    @InjectModel('managers')
    private managerModel:Model<IManager>
  ){}
  async createmanager(createManagerDto: CreateManagerDto):Promise<IManager> {
    const newmanager=new this.managerModel(createManagerDto)
    return newmanager.save()
  }

  async getallmanagers():Promise<IManager[]>{
    const managersData= await this.managerModel.find()
    if(!managersData||managersData.length==0){
      throw new NotFoundException('Managers data not found')
    }
    return managersData
  }

  async getmanager(managerId: string) {
    const existingmanager=await this.managerModel.findById(managerId).exec()
    if(!existingmanager){
      throw new NotFoundException(`Manager with id ${managerId} not found`)
    }
    return existingmanager
  }
  async updatemanager(managerId: string, UpdateManagerDto: UpdateManagerDto) {
    const existingmanager=await this.managerModel.findByIdAndUpdate(managerId,UpdateManagerDto,{new:true})
    if(!existingmanager){
      throw  new NotFoundException(`Manager with id ${managerId} not found`)
    }
    return existingmanager
  }

  async  deletemanager(managerId: string) {
    const deletedmanager=await this.managerModel.findByIdAndDelete(managerId,)
    if(!deletedmanager){
      throw new NotFoundException(`Manager  with id ${managerId} not found`)
    }
    return deletedmanager
  }
}
