import { CreateRegionalDto } from "./dto/create-regional.dto";
import { RegionalEntity } from "./entities/regional.entity";

export interface IRegionalService {
    regionalAlredyExists(id: string): Promise<RegionalEntity>;
    create(data: CreateRegionalDto): Promise<RegionalEntity>;
    readOne(id: string): Promise<RegionalEntity>;
    readAll(): Promise<RegionalEntity[]>;
    update(data: CreateRegionalDto, id: string): Promise<RegionalEntity>;
    delete(id: string): Promise<{ message: string; affected: number }>;
    regionalAlredyInUse(name: string): Promise<void>;
}