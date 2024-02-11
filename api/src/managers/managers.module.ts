import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { ManagersSchema } from './entities/manager.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'managers',schema:ManagersSchema}])],
  controllers: [ManagersController],
  providers: [ManagersService]
})
export class ManagersModule {}
