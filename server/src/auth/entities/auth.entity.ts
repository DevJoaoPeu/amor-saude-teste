import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsEmail, Length } from 'class-validator';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(1, 100)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(6, 100)
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
