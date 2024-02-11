import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('managers')
@ApiTags('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  async createmanager(@Res()response,@Body()createManagerDto: CreateManagerDto) {
    try {
      const newmanager=await this.managersService.createmanager(createManagerDto)
      return response.status(HttpStatus.CREATED).json({
        message:"Manager created successfully !",
        status:HttpStatus.CREATED,
        data:newmanager
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
  async getallmanagers(@Res()response) {
    try {
      const managersData=await this.managersService.getallmanagers()
    return response.status(HttpStatus.OK).json({
      message:"All Managers data found successfully !",
      status:HttpStatus.OK,
      data:managersData
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
    description:"should be an id of manager that exists in the database",
    type:String
  })
  async getmanager(@Res()response,@Param('id') managerId: string) {
    try {
      const existingmanager=await this.managersService.getmanager(managerId)
      return response.status(HttpStatus.OK).json({
        message:'Manager found by Id successfully',
        status:HttpStatus.OK,
        data:existingmanager
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
  async updatemanager(@Res()response ,@Param('id') managerId: string, @Body() updateManagerDto: UpdateManagerDto) {
    try {
      const existingmanager=await this.managersService.updatemanager(managerId,updateManagerDto)
      return response.status(HttpStatus.OK).json({
        message:'Manager updated successfully ! ',
        status:HttpStatus.OK,
        data:existingmanager
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
  async deletemanager(@Res() response,  @Param('id') managerId: string) {
    try {
      const deletedmanager=await this.managersService.deletemanager(managerId)
      return response.status(HttpStatus.OK).json({
        message:'Manager deleted successfully ',
        status:HttpStatus.OK,
        data:deletedmanager
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
