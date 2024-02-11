import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskemployeeDto } from './dto/create-taskemployee.dto';
import { UpdateTaskemployeeDto } from './dto/update-taskemployee.dto';
import { ITaskemployee } from './interfaces/taskemployee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmployee } from 'src/employees/interfaces/employee.interface';
import { ITask } from 'src/tasks/interfaces/task.interface';
import { IUser } from 'src/users/interfaces/user.interface';
@Injectable()

export class TaskemployeeService {
  constructor(
    @InjectModel('taskemployees')
    private taskemployeeModel:Model<ITaskemployee>,
    @InjectModel('employees')
    private employeeModel:Model<IEmployee>,
    @InjectModel('users')
    private userModel:Model<IUser>,
    @InjectModel('tasks')
    private tasksModel:Model<ITask>
    
  ){}
  async createtaskemployee(createTaskemployeeDto: CreateTaskemployeeDto):Promise<ITaskemployee> {
    const newtaskemployee=new this.taskemployeeModel(createTaskemployeeDto)
    await this.tasksModel.updateOne({_id:createTaskemployeeDto.task}, 
      {$push:{taskemployee:newtaskemployee._id}}),
      await this.userModel.updateOne({_id:createTaskemployeeDto.employee}, 
        {$push:{taskemployee:newtaskemployee._id}})
    return newtaskemployee.save() 
  }

  async getalltaskemployee():Promise<ITaskemployee[]> {
    const taskemployeedata= await this.taskemployeeModel.find()
    if(!taskemployeedata||taskemployeedata.length==0){
      throw new NotFoundException(`Taskemployee data not found`)
    }
    return taskemployeedata
  }

  async gettaskemployee(taskemployeeId: string) {
    const existingtaskemployee=await this.taskemployeeModel.findById(taskemployeeId).exec()
    if(!existingtaskemployee){
      throw new NotFoundException(`Taskemployee with id ${taskemployeeId} not found`)
    }
    return existingtaskemployee
  }

  async updatetaskemployee(taskemployeeId: string, updateTaskemployeeDto: UpdateTaskemployeeDto) {
    const existingtaskemployee=await this.taskemployeeModel.findByIdAndUpdate(taskemployeeId , updateTaskemployeeDto)
    if(!existingtaskemployee){
      throw new NotFoundException(`taskemployee  with id ${taskemployeeId} not found`)
    }
    return existingtaskemployee
  }

  async deletetaskemployee(taskemployeeId: string) {
    const deletedtaskemployee=await this.taskemployeeModel.findByIdAndDelete(taskemployeeId)
    await this.tasksModel.updateOne({_id:deletedtaskemployee.task},
      {$pull:{taskemployee:deletedtaskemployee._id}}),
      await this.employeeModel.updateOne({_id:deletedtaskemployee.employee},
        {$pull:{taskemployee:deletedtaskemployee._id}})
    if(!deletedtaskemployee){
      throw new NotFoundException(`Taskemployee with id ${taskemployeeId} not found`)
    }
    return deletedtaskemployee
  }
}
