import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './interfaces/task.interface';
import { IProject } from 'src/projects/interfaces/project.interface';
import { IStatus } from 'src/status/interfaces/status.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('tasks')
    private tasksModel:Model<ITask>,
    @InjectModel('projects')
    private projectModel:Model<IProject>,
    @InjectModel('status')
    private statusModel:Model<IStatus>
  ){}
  async createtask(createTaskDto: CreateTaskDto):Promise<ITask>{
    const newtask=await new this.tasksModel(createTaskDto)
    await this.projectModel.updateOne({_id:createTaskDto.project}, 
      {$push:{tasks:newtask._id}})
      await this.statusModel.updateOne({_id:createTaskDto.status}, 
        {$push:{tasks:newtask._id}})
    return newtask.save()
  }

  async getalltasks():Promise<ITask[]> {
    const tasksdata= await this.tasksModel.find().populate("project").populate("status")
    if(!tasksdata||tasksdata.length==0){
      throw new NotFoundException(`Tasks data not found`)
    }
    return tasksdata
  }

  async gettask(taskId: string):Promise<ITask> {
    const existingtask=await this.tasksModel.findOne().populate("project").populate("status").exec()
    if(!existingtask){
      throw new NotFoundException(`Task with id ${taskId} not found`)
    }
    return existingtask
  }

  async updatetask(taskId: string, updateTaskDto: UpdateTaskDto) {
    const existingtask=await this.tasksModel.findByIdAndUpdate(taskId)
    if(!existingtask){
      throw new NotFoundException(`task  with id ${taskId} not found`)
    }
    return existingtask
  }

  async deletetask(taskId: string) {
    const deletedtask=await this.tasksModel.findByIdAndDelete(taskId)
    await this.projectModel.updateOne({_id:deletedtask.project},
      {$pull:{tasks:deletedtask._id}})
      await this.statusModel.updateOne({_id:deletedtask.status},
        {$pull:{tasks:deletedtask._id}})
    if(!deletedtask){
      throw new NotFoundException(`Task with id ${taskId} not found`)
    }
    return deletedtask
  }
  
}
