import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { TaskemployeeService } from './taskemployee.service';
import { CreateTaskemployeeDto } from './dto/create-taskemployee.dto';
import { UpdateTaskemployeeDto } from './dto/update-taskemployee.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('taskemployee')
export class TaskemployeeController {
  constructor(private readonly taskemployeeService: TaskemployeeService) {}

  @Post()
  async createtaskemployee(@Res() response ,@Body() createTaskemployeeDto: CreateTaskemployeeDto) {
    try {
      const newtaskemployee=await this.taskemployeeService.createtaskemployee(createTaskemployeeDto)
      return response.status(HttpStatus.CREATED).json({
        message:"taskemployee created successfully !",
        status:HttpStatus.CREATED,
        data:newtaskemployee
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
  async getalltaskemployee(@Res()response) {
    try {
      const taskemployeedata=await this.taskemployeeService.getalltaskemployee()
      return response.status(HttpStatus.OK).json({
        message:"all taskemployee Data found successfully !",
        status:HttpStatus.OK,
        data:taskemployeedata
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
    description:"should be an id of tasksemployee that exists in the database",
    type:String
  })
 
  async gettaskemployee(@Res()response,@Param('id') taskemployeeId: string) {
    try {
      const existingtaskemployee=await this.taskemployeeService.gettaskemployee(taskemployeeId)
      return response.status(HttpStatus.OK).json({
        message:'Taskemployee found by Id successfully',
        status:HttpStatus.OK,
        data:existingtaskemployee
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
  async updatetaskemployee(@Res()response ,@Param('id') taskemployeeId: string, @Body() updateTaskemployeeDto: UpdateTaskemployeeDto) {
    try {
      const existingtaskemployee=await this.taskemployeeService.updatetaskemployee(taskemployeeId,updateTaskemployeeDto)
      return response.status(HttpStatus.OK).json({
        message:'taskemployee updated successfully',
        status:HttpStatus.OK,
        data:existingtaskemployee
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
  async deletetaskemployee(@Res()response,@Param('id') taskemployeeId: string) {
    try {
      const deletedtaskemployee=await this.taskemployeeService.deletetaskemployee(taskemployeeId)
      return response.status(HttpStatus.OK).json({
        message:"Taskemployee deleted successfully",
        status:HttpStatus.OK,
        data:deletedtaskemployee
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
