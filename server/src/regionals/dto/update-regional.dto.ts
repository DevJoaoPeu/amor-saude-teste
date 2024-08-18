import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionalDto } from './create-regional.dto';

export class UpdateRegionalDto extends PartialType(CreateRegionalDto) {}
