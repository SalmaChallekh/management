import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDmholidayDto } from './dto/create-dmholiday.dto';
import { UpdateDmholidayDto } from './dto/update-dmholiday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDmholiday } from './interfaces/dmholiday.interface';
import { IUser } from 'src/users/interfaces/user.interface';
import { IHoliday } from 'src/holidays/interfaces/holiday.interface';

@Injectable()
export class DmholidayService {
  constructor(
    @InjectModel('dmholidays')
    private dmholidayModel:Model<IDmholiday>,
   /*  @InjectModel('users')
    private userModel:Model<IUser>, */
    @InjectModel('holidays')
    private holidayModel:Model<IHoliday>
  ){}
  async creatdmeholiday(createDmholidayDto: CreateDmholidayDto):Promise<IDmholiday> {
    const newdmholiday=new this.dmholidayModel(createDmholidayDto)
    /* await this.userModel.updateOne({_id:createDmholidayDto.user}, 
      {$push:{dmholidays:newdmholiday._id}}) */
      await this.holidayModel.updateOne({_id:createDmholidayDto.holiday}, 
        {$push:{holidays:newdmholiday._id}})
    return newdmholiday.save()
  }

  async getalldmholidays():Promise<IDmholiday[]>{
    const dmholidaysData= await this.dmholidayModel.find().populate('holiday')
    if(!dmholidaysData||dmholidaysData.length==0){
      throw new NotFoundException('dmHolidays data not found')
    }
    return dmholidaysData
  }
  async getdmholiday(dmholidayId: string) {
    const existingdmholiday=await this.dmholidayModel.findById(dmholidayId).populate('holiday').exec()
    if(!existingdmholiday){
      throw new NotFoundException(`dmHoliday with id ${dmholidayId} not found`)
    }
    return existingdmholiday
  }

  async updatedmholiday(dmholidayId: string, updateDmholidayDto: UpdateDmholidayDto) {
    const existingdmholiday=await this.dmholidayModel.findByIdAndUpdate(dmholidayId, {accepted:true},{new:true})
      if(!existingdmholiday){
        throw  new NotFoundException(`dmHoliday with id ${dmholidayId} not found`)
      }
      return existingdmholiday
    }

    async deletedmholiday(dmholidayId: string) {
      const deleteddmholiday=await this.dmholidayModel.findByIdAndDelete(dmholidayId)
      if(!deleteddmholiday){
       throw new NotFoundException(`Holiday with Id ${dmholidayId} not found`)
      }
      return deleteddmholiday
     }
}
