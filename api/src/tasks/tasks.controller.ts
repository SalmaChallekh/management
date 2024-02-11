import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createtask(@Res()response,@Body() createTaskDto: CreateTaskDto) {
    try {
      const newtask=await this.tasksService.createtask(createTaskDto)
      return response.status(HttpStatus.CREATED).json({
        message:"Task created successfully! ",
        status:HttpStatus.CREATED,
        data:newtask
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
  async getalltasks(@Res()response) {
    try {
      const tasksdata=await this.tasksService.getalltasks()
      return response.status(HttpStatus.OK).json({
        message:"all tasks Data found successfully !",
        status:HttpStatus.OK,
        data:tasksdata
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
    description:"should be an id of tasks that exists in the database",
    type:String
  })
  async gettask(@Res()response,@Param('id') taskId: string) {
    try {
      const existingtask=await this.tasksService.gettask(taskId)
      return response.status(HttpStatus.OK).json({
        message:"Task found by ID successfully !",
        status:HttpStatus.OK,
        data:existingtask
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
  async updateask(@Res()response ,@Param('id') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const existingtask=await this.tasksService.updatetask(taskId,updateTaskDto)
      return response.status(HttpStatus.OK).json({
        message:'task updated successfully',
        status:HttpStatus.OK,
        data:existingtask
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
  async deletetask(@Res()response,@Param('id') taskId: string) {
    try {
      const deletedtask=await this.tasksService.deletetask(taskId)
      return response.status(HttpStatus.OK).json({
        message:"Task deleted successfully",
        status:HttpStatus.OK,
        data:deletedtask
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
