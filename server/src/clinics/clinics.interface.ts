import { CreateClinicDto } from "./dto/create-clinics.dto";
import { UpdateClinicsDto } from "./dto/update-clinics.dto";
import { ClinicEntity } from "./entities/clinics.entity";

export interface IClinicsService {
    create(data: CreateClinicDto): Promise<ClinicEntity>;
    readOne(id: string): Promise<ClinicEntity>;
    readAll(): Promise<ClinicEntity[]>;
    delete(id: string): Promise<{ message: string; affected: number }>;
    update(data: UpdateClinicsDto, id: string): Promise<ClinicEntity>;
    clinicsAlredyExists(id: string): Promise<ClinicEntity>;
}