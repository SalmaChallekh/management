import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createemployee(@Res()response,@Body()createEmployeeDto: CreateEmployeeDto) {
    try {
      const newemployee=await this.employeesService.createemployee(createEmployeeDto)
      return response.status(HttpStatus.CREATED).json({
        message:"Employee created successfully !",
        status:HttpStatus.CREATED,
        data:newemployee
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
  async getallemployees(@Res()response) {
    try {
      const employeesData=await this.employeesService.getallemployees()
    return response.status(HttpStatus.OK).json({
      message:"All Employees data found successfully !",
      status:HttpStatus.OK,
      data:employeesData
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
    description:"should be an id of employee that exists in the database",
    type:String
  })
  async getemployee(@Res()response,@Param('id') employeeId: string) {
    try {
      const existingemployee=await this.employeesService.getemployee(employeeId)
      return response.status(HttpStatus.OK).json({
        message:'Employee found by Id successfully',
        status:HttpStatus.OK,
        data:existingemployee
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
  async updateemployee(@Res()response ,@Param('id') employeeId: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const existingemployee=await this.employeesService.updateemployee(employeeId,updateEmployeeDto)
      return response.status(HttpStatus.OK).json({
        message:'Employee updated successfully ! ',
        status:HttpStatus.OK,
        data: existingemployee
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
  async deleteemployee(@Res() response,  @Param('id') employeeId: string) {
    try {
      const deletedemployee=await this.employeesService.deleteemployee(employeeId)
      return response.status(HttpStatus.OK).json({
        message:'Employee deleted successfully ',
        status:HttpStatus.OK,
        data:deletedemployee
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
