import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IHoliday } from './interfaces/holiday.interface';
import { Model } from 'mongoose';

@Injectable()
export class HolidaysService {
  constructor(
    @InjectModel('holidays')
    private holidayModel:Model<IHoliday>,
    

  ){}
  async createholiday(createHolidayDto: CreateHolidayDto):Promise<IHoliday> {
    const newholiday=new this.holidayModel(createHolidayDto)
    return newholiday.save()
  }

  async getallholidays():Promise<IHoliday[]>{
    const holidaysData= await this.holidayModel.find()
    if(!holidaysData||holidaysData.length==0){
      throw new NotFoundException('Holidays data not found')
    }
    return holidaysData
  }
  async getholiday(holidayId: string) {
    const existingholiday=await this.holidayModel.findById(holidayId).exec()
    if(!existingholiday){
      throw new NotFoundException(`Holiday with id ${holidayId} not found`)
    }
    return existingholiday
  }

  async updateholiday(holidayId: string, updateHolidayDto: UpdateHolidayDto) {
    const existingholiday=await this.holidayModel.findByIdAndUpdate(holidayId,updateHolidayDto,{new:true})
      if(!existingholiday){
        throw  new NotFoundException(`Holiday with id ${holidayId} not found`)
      }
      return existingholiday
    }

    async deleteholiday(holidayId: string) {
      const deletedholiday=await this.holidayModel.findByIdAndDelete(holidayId)
      if(!deletedholiday){
       throw new NotFoundException(`Holiday with Id ${holidayId} not found`)
      }
      return deletedholiday
     }
}
