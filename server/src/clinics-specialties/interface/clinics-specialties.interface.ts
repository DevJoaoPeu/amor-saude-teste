import { CreateClinicsSpecialtiesDto } from "../dto/create-clinics-specialties.dto";
import { UpdateClinicsSpecialtiesDto } from "../dto/update-clinics-specialties.dto";
import { ClinicsSpecialtiesEntity } from "../entities/clinics-specialties.entity";

export abstract class IClinicsSpecialtiesService {
    abstract create(data: CreateClinicsSpecialtiesDto): Promise<ClinicsSpecialtiesEntity>;
    abstract readAll(): Promise<ClinicsSpecialtiesEntity[]>;
    abstract readOne(id: string): Promise<ClinicsSpecialtiesEntity>;
    abstract update(id: string, data: UpdateClinicsSpecialtiesDto): Promise<ClinicsSpecialtiesEntity>;
    abstract delete(id: string): Promise<{ message: string; affected: number }>;
}