import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './entities/project.entity';
import { StatusSchema } from 'src/status/entities/status.entity';
import { UsersSchema } from 'src/users/entities/user.entity';
import { ManagersSchema } from 'src/managers/entities/manager.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'projects',schema:ProjectSchema}]),
 // MongooseModule.forFeature([{name:'managers',schema:ManagersSchema}]),
  MongooseModule.forFeature([{name:'users',schema:UsersSchema}]),
  MongooseModule.forFeature([{name:'status',schema:StatusSchema}])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
