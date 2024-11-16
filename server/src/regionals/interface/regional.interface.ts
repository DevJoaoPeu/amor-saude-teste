import { CreateRegionalDto } from "../dto/create-regional.dto";
import { RegionalEntity } from "../entities/regional.entity";

export abstract class IRegionalService {
    abstract regionalAlredyExists(id: string): Promise<RegionalEntity>;
    abstract create(data: CreateRegionalDto): Promise<RegionalEntity>;
    abstract readOne(id: string): Promise<RegionalEntity>;
    abstract readAll(): Promise<RegionalEntity[]>;
    abstract update(data: CreateRegionalDto, id: string): Promise<RegionalEntity>;
    abstract delete(id: string): Promise<{ message: string; affected: number }>;
    abstract regionalAlredyInUse(name: string): Promise<void>;
}