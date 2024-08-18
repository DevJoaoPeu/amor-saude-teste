import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionalEntity } from './entities/regional.entity';
import { Repository } from 'typeorm';
import { CreateRegionalDto } from './dto/create-regional.dto';

@Injectable()
export class RegionalService {
  constructor(
    @InjectRepository(RegionalEntity)
    private readonly repository: Repository<RegionalEntity>,
  ) {}

  async create(data: CreateRegionalDto) {
    const regional = this.repository.create(data);
    return await this.repository.save(regional);
  }
}
