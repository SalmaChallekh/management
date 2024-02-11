import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { ISituationprof } from 'src/situationprof/interfaces/situationprof.interface';
import { ITaskemployee } from 'src/taskemployee/interfaces/taskemployee.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private userModel:Model<IUser>,
    @InjectModel('situationprof')
    private situationprofModel:Model<ISituationprof>,
    @InjectModel('taskemployees')
    private taskemployeeModel:Model<ITaskemployee>,
  ){}

  async createuser(createUserDto: CreateUserDto):Promise<IUser> {
    const newuser=new this.userModel(createUserDto)
    /* await this.taskemployeeModel.updateOne({_id:createUserDto.taskemployee}, 
      {$push:{users:newuser._id}}) */
     await this.situationprofModel.updateOne({_id:createUserDto.situationprof}, 
      {$push:{users:newuser._id}})
    return newuser.save()
  }

  async getallusers():Promise<IUser[]>{
    const usersData= await this.userModel.find().populate('situationprof')
    if(!usersData||usersData.length==0){
      throw new NotFoundException('Users data not found')
    }
    return usersData
  }
  async findByUserName(userName:string):Promise<IUser>{
    return this.userModel.findOne({userName}).exec()
  }
  async findAllUserByitems(items:string): Promise<IUser[]> {
    return this.userModel.find({items}).populate("situationprof").exec();
   }
  async getuser(userId: string) {
    const existinguser=await this.userModel.findById(userId).exec()
    if(!existinguser){
      throw new NotFoundException(`User with id ${userId} not found`)
    }
    return existinguser
  }
  async updateuser(userId: string, UpdateUserDto: UpdateUserDto) {
  const existinguser=await this.userModel.findByIdAndUpdate(userId,UpdateUserDto,{new:true})
    if(!existinguser){
      throw  new NotFoundException(`User with id  not found`)
    }
    return existinguser
  }

  async deleteuser(userId: string) {
   const deleteduser=await this.userModel.findByIdAndDelete(userId)
   if(!deleteduser){
    throw new NotFoundException(`User with Id ${userId} not found`)
   }
   return deleteduser
  }
}
