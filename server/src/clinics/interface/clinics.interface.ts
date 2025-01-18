import { CreateClinicDto } from "../dto/create-clinics.dto";
import { UpdateClinicsDto } from "../dto/update-clinics.dto";
import { ClinicEntity } from "../entities/clinics.entity";

export abstract class IClinicsService {
    abstract create(data: CreateClinicDto): Promise<ClinicEntity>;
    abstract readOne(id: string): Promise<ClinicEntity>;
    abstract readAll(): Promise<ClinicEntity[]>;
    abstract delete(id: string): Promise<{ message: string; affected: number }>;
    abstract update(data: UpdateClinicsDto, id: string): Promise<ClinicEntity>;
    abstract clinicsAlredyExists(id: string): Promise<ClinicEntity>;
    abstract transformCnpj(cnpj: string): string;
    abstract clinicsCnpjAlredyExists(cnpj: string): Promise<ClinicEntity>;
}