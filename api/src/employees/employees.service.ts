import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IEmployee } from './interfaces/employee.interface';
import { Model } from 'mongoose';
@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('employees')
    private EmployeeModel:Model<IEmployee>
  ){}
  async  createemployee(createEmployeeDto: CreateEmployeeDto):Promise<IEmployee> {
    const newemployee=new this.EmployeeModel(createEmployeeDto)
    return newemployee.save()
  }


  async  getallemployees():Promise<IEmployee[]>{
    const employeesData= await this.EmployeeModel.find()
    if(!employeesData||employeesData.length==0){
      throw new NotFoundException('Employees data not found')
    }
    return employeesData
  }

  async getemployee(employeeId: string) {
    const existingemployee=await this.EmployeeModel.findById(employeeId).exec()
    if(!existingemployee){
      throw new NotFoundException(`Employee with id ${employeeId} not found`)
    }
    return existingemployee
  }

  async updateemployee(employeeId: string, UpdateEmployeeDto: UpdateEmployeeDto) {
    const existingemployee=await this.EmployeeModel.findByIdAndUpdate(employeeId,UpdateEmployeeDto,{new:true})
    if(!existingemployee){
      throw  new NotFoundException(`Employee with id ${employeeId} not found`)
    }
    return existingemployee
  }

  async  deleteemployee(employeeId: string) {
    const deletedemployee=await this.EmployeeModel.findByIdAndDelete(employeeId,)
    if(!deletedemployee){
      throw new NotFoundException(`Employee  with id ${employeeId} not found`)
    }
    return deletedemployee
  }
}
