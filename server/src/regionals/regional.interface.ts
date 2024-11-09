import { RegionalEntity } from "./entities/regional.entity";

export interface IRegionalService {
    regionalAlredyExists(id: string): Promise<RegionalEntity>
}