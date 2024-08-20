import { ClinicEntity } from 'src/clinics/entities/clinics.entity';
import { SpecialtiesEntity } from 'src/specialties/entitites/specialties.entity.dto';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clinics-specialties')
export class ClinicsSpecialtiesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClinicEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'clinic_id' })
  clinic: ClinicEntity;

  @ManyToOne(() => SpecialtiesEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'specialty_id' })
  specialty: SpecialtiesEntity;
}
