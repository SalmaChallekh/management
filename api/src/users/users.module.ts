import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './entities/user.entity';
import { Employee, EmployeeSchema } from 'src/employees/entities/employee.entity';
import { Manager, ManagersSchema } from 'src/managers/entities/manager.entity';
import { Admin, AdminSchema } from 'src/admins/entities/admin.entity';
import { SituationprofSchema } from 'src/situationprof/entities/situationprof.entity';
import { TaskemployeeSchema } from 'src/taskemployee/entities/taskemployee.entity';
@Module({
  imports:[MongooseModule.forFeature([{name:'users',schema:UsersSchema,discriminators:[
    {name:Employee.name,schema:EmployeeSchema},
    {name:Manager.name,schema:ManagersSchema},
    {name:Admin.name,schema:AdminSchema}
  ]}]),
  MongooseModule.forFeature([{name:'situationprof',schema:SituationprofSchema}]),
  MongooseModule.forFeature([{name:'taskemployees',schema:TaskemployeeSchema}]),],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
