import { PartialType } from '@nestjs/swagger';
import { CreateSituationprofDto } from './create-situationprof.dto';

export class UpdateSituationprofDto extends PartialType(CreateSituationprofDto) {}
