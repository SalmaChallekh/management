import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './interfaces/admin.interface';
import { Model } from 'mongoose';
@Injectable()
export class AdminsService {
  constructor(
    @InjectModel('admins')
    private adminModel:Model<IAdmin>
  ){}
  async createadmin(createAdminDto: CreateAdminDto):Promise<IAdmin> {
    const newadmin=new this.adminModel(createAdminDto)
    return newadmin.save()
  }

  async  getalladmins():Promise<IAdmin[]>{
    const adminsData= await this.adminModel.find()
    if(!adminsData||adminsData.length==0){
      throw new NotFoundException('Admins data not found')
    }
    return adminsData
  }

  async getadmin(adminId: string) {
    const existingadmin=await this.adminModel.findById(adminId).exec()
    if(!existingadmin){
      throw new NotFoundException(`Admin with id ${adminId} not found`)
    }
    return existingadmin
  }

  async updateadmin(adminId: string, UpdateAdminDto: UpdateAdminDto) {
    const existingadmin=await this.adminModel.findByIdAndUpdate(adminId,UpdateAdminDto,{new:true})
    if(!existingadmin){
      throw  new NotFoundException(`Admin with id ${adminId} not found`)
    }
    return existingadmin
  }


  async  deleteadmin(adminId: string) {
    const deletedadmin=await this.adminModel.findByIdAndDelete(adminId,)
    if(!deletedadmin){
      throw new NotFoundException(`Admin  with id ${adminId} not found`)
    }
    return deletedadmin
  }
}
