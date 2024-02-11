import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer/dist';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ManagersModule } from './managers/managers.module';
import { AdminsModule } from './admins/admins.module';
import { EmployeesModule } from './employees/employees.module';
import { HolidaysModule } from './holidays/holidays.module';
import { TaskemployeeModule } from './taskemployee/taskemployee.module';
import { StatusModule } from './status/status.module';
import { DmholidayModule } from './dmholiday/dmholiday.module';
import { SituationprofModule } from './situationprof/situationprof.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017',{dbName:'pfe'}),
  ProjectsModule, 
  TasksModule,
  UsersModule,
  AuthModule,
  ConfigModule.forRoot({isGlobal:true}),
  MailerModule.forRoot({
  transport:{
    host:"sandbox.smtp.mailtrap.io",
    port:2525,
    auth: {
      user: "667957c24673dd",
      pass: "3d7d6f3a3a06be"
    }
  },
  defaults:{
    from:'"no replay"<noreply@exemple.com>'
  },
  template:{
    dir: join(__dirname,'templates'),
    
    adapter: new HandlebarsAdapter(),
    options:{
      strict:true
    }
  }
}),
ManagersModule,
AdminsModule,
EmployeesModule,
HolidaysModule,
TaskemployeeModule,
StatusModule,
DmholidayModule,
SituationprofModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
