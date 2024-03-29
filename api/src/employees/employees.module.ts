import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './entities/employee.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'employees',schema:EmployeeSchema}])],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
