import { Module } from '@nestjs/common';
import { DmholidayService } from './dmholiday.service';
import { DmholidayController } from './dmholiday.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DmholidaySchema } from './entities/dmholiday.entity';
import { UsersSchema } from 'src/users/entities/user.entity';
import { HolidaySchema } from 'src/holidays/entities/holiday.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'dmholidays',schema:DmholidaySchema}]),
 /*  MongooseModule.forFeature([{name:'users',schema:UsersSchema}]) */
  MongooseModule.forFeature([{name:'holidays',schema:HolidaySchema}]),],
  controllers: [DmholidayController],
  providers: [DmholidayService]
})
export class DmholidayModule {}
