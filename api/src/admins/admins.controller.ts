import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import {ApiParam, ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
@ApiTags('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  async createadmin(@Res()response,@Body()createAdminDto: CreateAdminDto) {
    try {
      const newadmin=await this.adminsService.createadmin(createAdminDto)
      return response.status(HttpStatus.CREATED).json({
        message:"Admin created successfully !",
        status:HttpStatus.CREATED,
        data:newadmin
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
  async getalladmins(@Res()response) {
    try {
      const adminsData=await this.adminsService.getalladmins()
    return response.status(HttpStatus.OK).json({
      message:"All Admins data found successfully !",
      status:HttpStatus.OK,
      data:adminsData
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
    description:"should be an id of admin that exists in the database",
    type:String
  })
  async getadmin(@Res()response,@Param('id') adminId: string) {
    try {
      const existingadmin=await this.adminsService.getadmin(adminId)
      return response.status(HttpStatus.OK).json({
        message:'Admin found by Id successfully',
        status:HttpStatus.OK,
        data:existingadmin
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
  async updateadmin(@Res()response ,@Param('id') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    try {
      const existingadmin=await this.adminsService.updateadmin(adminId,updateAdminDto)
      return response.status(HttpStatus.OK).json({
        message:'Admin updated successfully ! ',
        status:HttpStatus.OK,
        data:existingadmin
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
  async deleteadmin(@Res() response,  @Param('id') adminId: string) {
    try {
      const deletedadmin=await this.adminsService.deleteadmin(adminId)
      return response.status(HttpStatus.OK).json({
        message:'Admin deleted successfully ',
        status:HttpStatus.OK,
        data:deletedadmin
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
