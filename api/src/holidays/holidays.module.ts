import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidaysController } from './holidays.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HolidaySchema } from './entities/holiday.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'holidays',schema:HolidaySchema}])],
  controllers: [HolidaysController],
  providers: [HolidaysService]
})
export class HolidaysModule {}
