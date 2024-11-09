import { UpdateClinicsSpecialtiesDto } from "src/clinics-specialties/dto/update-clinics-specialties.dto"
import { CreateSpecialtiesDto } from "./dto/create-specialties.dto"
import { SpecialtiesEntity } from "./entitites/specialties.entity.dto"

export interface ISpecialtiesService {
    create(data: CreateSpecialtiesDto): Promise<SpecialtiesEntity>
    readAll(): Promise<SpecialtiesEntity[]>
    readOne(id: string): Promise<SpecialtiesEntity>
    update(id: string, data: CreateSpecialtiesDto): Promise<SpecialtiesEntity>
    delete(id: string): Promise<{ message: string; affected: number }>  
    specialtiesAlredyExists(id: string): Promise<SpecialtiesEntity>
}