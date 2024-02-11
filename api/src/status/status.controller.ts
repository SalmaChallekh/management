import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

import { ApiTags } from '@nestjs/swagger';

@Controller('status')
@ApiTags('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async createstatus(@Res() response,@Body() createStatusDto: CreateStatusDto) {
    try {
      const newstatus=await this.statusService.createstatus(createStatusDto)
      return response.status(HttpStatus.CREATED).json({
        message:"Status created successfully! ",
        status:HttpStatus.CREATED,
        data:newstatus
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
  async getallstatus(@Res()response) {
    try {
      const statusData=await this.statusService.getallstatus()
    return response.status(HttpStatus.OK).json({
      message:"All status data found successfully !",
      status:HttpStatus.OK,
      data:statusData
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
  async getstatus(@Res()response,@Param('id') statusId: string) {
    try {
      const existingstatus=await this.statusService.getstatus(statusId)
      return response.status(HttpStatus.OK).json({
        message:'Status found by Id successfully',
        status:HttpStatus.OK,
        data:existingstatus
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
  async updatestatus(@Res()response ,@Param('id') statusId: string, @Body() UpdateStatusDto: UpdateStatusDto) {
    try {
      const existingstatus=await this.statusService.updatestatus(statusId,UpdateStatusDto)
      return response.status(HttpStatus.OK).json({
        message:'User updated successfully ! ',
        status:HttpStatus.OK,
        data:existingstatus
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
  async deletestatus(@Res() response,@Param('id') statusId: string) {
    try {
      const deletedstatus=await this.statusService.deletestatus(statusId)
      return response.status(HttpStatus.OK).json({
        message:"status deleted successfully !",
        status:HttpStatus.OK,
        data:deletedstatus
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
