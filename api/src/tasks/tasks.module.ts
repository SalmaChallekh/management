import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksSchema } from './entities/task.entity';
import { ProjectSchema } from 'src/projects/entities/project.entity';
import { StatusSchema } from 'src/status/entities/status.entity';
@Module({
  imports:[MongooseModule.forFeature([{name:'tasks',schema:TasksSchema}]),
  MongooseModule.forFeature([{name:'projects',schema:ProjectSchema}]),
  MongooseModule.forFeature([{name:'status',schema:StatusSchema}]),],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
