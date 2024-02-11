import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@Controller('holidays')
@ApiTags('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Post()
  async createholiday(@Res() response,@Body() createHolidayDto: CreateHolidayDto  ) {
    try {
      const newholiday=await this.holidaysService.createholiday(createHolidayDto)
      return response.status(HttpStatus.CREATED).json({
        message:"Holiday created successfully !",
        status:HttpStatus.CREATED,
        data:newholiday
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Get()
  /* async getallholidays(@Res()response) {
    try {
      const holidaysData=await this.holidaysService.getallholidays()
    return response.status(HttpStatus.OK).json({
      message:"All holidays data found successfully !",
      status:HttpStatus.OK,
      data:holidaysData
    })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  } */
  async  getallholidays(@Res() response) {
    try {
      const holidaysData=await this.holidaysService.getallholidays()
      return response.status(HttpStatus.OK).json({
        message:'All holidays data found successfully ! ',
        status:HttpStatus.OK,
        data:holidaysData
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Get(':id')
  @ApiParam({
    name:"id",
    required:true,
    description:"should be an id of holiday that exists in the database",
    type:String
  })
  async getholiday(@Res()response,@Param('id') holidayId: string) {
    try {
      const existingholiday=await this.holidaysService.getholiday(holidayId)
      return response.status(HttpStatus.OK).json({
        message:'Holiday found by Id successfully',
        status:HttpStatus.OK,
        data:existingholiday
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Patch(':id')
  async updateholiday(@Res()response ,@Param('id') holidayId: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    try {
      const existingholiday=await this.holidaysService.updateholiday(holidayId,updateHolidayDto)
      return response.status(HttpStatus.OK).json({
        message:'Holiday updated successfully ! ',
        status:HttpStatus.OK,
        data:existingholiday
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
  @Delete(':id')
  async deleteholiday(@Res() response,@Param('id') holidayId: string) {
    try {
      const deletedholiday=await this.holidaysService.deleteholiday(holidayId)
      return response.status(HttpStatus.OK).json({
        message:"Holiday deleted successfully !",
        status:HttpStatus.OK,
        data:deletedholiday
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
