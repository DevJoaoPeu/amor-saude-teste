import { UpdateClinicsSpecialtiesDto } from "src/clinics-specialties/dto/update-clinics-specialties.dto"
import { CreateSpecialtiesDto } from "../dto/create-specialties.dto"
import { SpecialtiesEntity } from "../entitites/specialties.entity.dto"

export abstract class ISpecialtiesService {
    abstract create(data: CreateSpecialtiesDto): Promise<SpecialtiesEntity>
    abstract readAll(): Promise<SpecialtiesEntity[]>
    abstract readOne(id: string): Promise<SpecialtiesEntity>
    abstract update(id: string, data: CreateSpecialtiesDto): Promise<SpecialtiesEntity>
    abstract delete(id: string): Promise<{ message: string; affected: number }>  
    abstract specialtiesAlredyExists(id: string): Promise<SpecialtiesEntity>
}