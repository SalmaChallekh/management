import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DmholidayService } from './dmholiday.service';
import { CreateDmholidayDto } from './dto/create-dmholiday.dto';
import { UpdateDmholidayDto } from './dto/update-dmholiday.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('dmholiday')
@ApiTags('dmholiday')
export class DmholidayController {
  constructor(private readonly dmholidayService: DmholidayService) {}

  @Post()
  async creatdmeholiday(@Res() response,@Body() createDmholidayDto: CreateDmholidayDto  ) {
    try {
      const newdmholiday=await this.dmholidayService.creatdmeholiday(createDmholidayDto)
      return response.status(HttpStatus.CREATED).json({
        message:"Holiday created successfully !",
        status:HttpStatus.CREATED,
        data:newdmholiday
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
  async  getalldmholidays(@Res() response) {
    try {
      const dmholidaysData=await this.dmholidayService.getalldmholidays()
      return response.status(HttpStatus.OK).json({
        message:'All dmholidays data found successfully ! ',
        status:HttpStatus.OK,
        data:dmholidaysData
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
    description:"should be an id of dmholiday that exists in the database",
    type:String
  })
  async getdmholiday(@Res()response,@Param('id') dmholidayId: string) {
    try {
      const existingdmholiday=await this.dmholidayService.getdmholiday(dmholidayId)
      return response.status(HttpStatus.OK).json({
        message:'dmHoliday found by Id successfully',
        status:HttpStatus.OK,
        data:existingdmholiday
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
  async updatedmholiday(@Res()response ,@Param('id') dmholidayId: string, @Body() updateDmholidayDto: UpdateDmholidayDto) {
    try {
      const existingdmholiday=await this.dmholidayService.updatedmholiday(dmholidayId,updateDmholidayDto)
      return response.status(HttpStatus.OK).json({
        message:'Holiday updated successfully ! ',
        status:HttpStatus.OK,
        data:existingdmholiday
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
  async deletedmholiday(@Res() response,@Param('id') dmholidayId: string) {
    try {
      const deleteddmholiday=await this.dmholidayService.deletedmholiday(dmholidayId)
      return response.status(HttpStatus.OK).json({
        message:"dmHoliday deleted successfully !",
        status:HttpStatus.OK,
        data:deleteddmholiday
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
