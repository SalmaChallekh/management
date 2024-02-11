import { PartialType } from '@nestjs/swagger';
import { CreateTaskemployeeDto } from './create-taskemployee.dto';

export class UpdateTaskemployeeDto extends PartialType(CreateTaskemployeeDto) {}
