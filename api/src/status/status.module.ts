import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { StatusSchema } from './entities/status.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'status',schema:StatusSchema}])],
  controllers: [StatusController],
  providers: [StatusService]
})
export class StatusModule {}
