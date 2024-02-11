import { Module } from '@nestjs/common';
import { TaskemployeeService } from './taskemployee.service';
import { TaskemployeeController } from './taskemployee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskemployeeSchema } from './entities/taskemployee.entity';
import { EmployeeSchema } from 'src/employees/entities/employee.entity';
import { TasksSchema } from 'src/tasks/entities/task.entity';
import { UsersSchema } from 'src/users/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'taskemployees',schema:TaskemployeeSchema}]),
  MongooseModule.forFeature([{name:'employees',schema:EmployeeSchema}]),
  MongooseModule.forFeature([{name:'users',schema:UsersSchema}]),
  MongooseModule.forFeature([{name:'tasks',schema:TasksSchema}])],
  controllers: [TaskemployeeController],
  providers: [TaskemployeeService]
})
export class TaskemployeeModule {}
