import { CreateClinicsSpecialtiesDto } from "./dto/create-clinics-specialties.dto";
import { UpdateClinicsSpecialtiesDto } from "./dto/update-clinics-specialties.dto";
import { ClinicsSpecialtiesEntity } from "./entities/clinics-specialties.entity";

export interface IClinicsSpecialtiesService {
    create(data: CreateClinicsSpecialtiesDto): Promise<ClinicsSpecialtiesEntity>;
    readAll(): Promise<ClinicsSpecialtiesEntity[]>;
    readOne(id: string): Promise<ClinicsSpecialtiesEntity>;
    update(id: string, data: UpdateClinicsSpecialtiesDto): Promise<ClinicsSpecialtiesEntity>;
    delete(id: string): Promise<{ message: string; affected: number }>;
}