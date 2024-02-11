import { PartialType } from '@nestjs/swagger';
import { CreateDmholidayDto } from './create-dmholiday.dto';

export class UpdateDmholidayDto extends PartialType(CreateDmholidayDto) {}
