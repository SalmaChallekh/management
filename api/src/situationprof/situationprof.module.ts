import { Module } from '@nestjs/common';
import { SituationprofService } from './situationprof.service';
import { SituationprofController } from './situationprof.controller';
import { SituationprofSchema } from './entities/situationprof.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'situationprof',schema:SituationprofSchema}])],
  controllers: [SituationprofController],
  providers: [SituationprofService]
})
export class SituationprofModule {}
