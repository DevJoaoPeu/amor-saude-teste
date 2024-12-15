import { IRegionalService } from "src/regionals/interface/regional.interface";
import { IClinicsService } from "../interface/clinics.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { ClinicsService } from "../clinics.service";
import { Repository } from "typeorm";
import { ClinicEntity } from "../entities/clinics.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { create } from "domain";
import { CreateClinicDto } from "../dto/create-clinics.dto";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('', () => {
    let clinicsService: IClinicsService;
    let regionalService: IRegionalService;
    let repository: Repository<ClinicEntity>;

    beforeEach(async () => {
        const mockRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
        };

        let module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: IClinicsService,
                    useClass: ClinicsService
                }, 
                {
                    provide: IRegionalService,
                    useValue: {
                        regionalAlredyExists: jest.fn()
                    }
                },
                {
                    provide: getRepositoryToken(ClinicEntity),
                    useValue: mockRepository, 
                },
            ],
        }).compile()

        clinicsService = module.get<IClinicsService>(IClinicsService);
        regionalService = module.get<IRegionalService>(IRegionalService);
        repository = module.get<Repository<ClinicEntity>>(getRepositoryToken(ClinicEntity));
    })

    it('should be defined', () => {
        expect(clinicsService).toBeDefined();
        expect(regionalService).toBeDefined();
        expect(repository).toBeDefined();
    })

    describe('create', () => {
        const mockClinic: CreateClinicDto = {
            razaoSocial: 'razao social',
            nomeFantasia: 'nome fantasia',
            cnpj: '09.512.501/0001-21',
            dataInauguracao: '2024-08-15',
            ativa: true,
            regional: '123',
        } 

        const mockRegional = {
            id: '123',
            name: 'Regional'
        }

        const mockClinicEntity: ClinicEntity = {
            id: '1',
            razaoSocial: mockClinic.razaoSocial,
            nomeFantasia: mockClinic.nomeFantasia,
            cnpj: '09.512.501/0001-21', 
            dataInauguracao: new Date(mockClinic.dataInauguracao),
            ativa: mockClinic.ativa,
            regional: mockRegional,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        it('deve criar uma clínica', async () => {
            jest.spyOn(regionalService, 'regionalAlredyExists').mockResolvedValue(mockRegional);
            jest.spyOn(repository, 'create').mockReturnValue(mockClinicEntity);
            jest.spyOn(repository, 'save').mockResolvedValue(mockClinicEntity);

            const clinic = await clinicsService.create(mockClinic);
    
            expect(repository.create).toHaveBeenCalledWith({
                ...mockClinic,
                regional: mockRegional,
            });
            expect(repository.save).toHaveBeenCalled();
            expect(clinic).toEqual({
                ...mockClinicEntity,
                dataInauguracao: new Date(mockClinic.dataInauguracao),
            });
        })

        it('deve lançar um erro se a regional nao existir', async () => {
            jest.spyOn(regionalService, 'regionalAlredyExists' ).mockRejectedValue(new NotFoundException('Regional not found'));

            await expect(clinicsService.create(mockClinic)).rejects.toThrow(NotFoundException);
        })

        it('deve lançar um error se o cnpj for invalido', async () => {
            const mockClinic: CreateClinicDto = {
                razaoSocial: 'razao social',
                nomeFantasia: 'nome fantasia',
                cnpj: 'invalido',
                dataInauguracao: '2024-08-15',
                ativa: true,
                regional: '123',
            } 

            await expect(clinicsService.create(mockClinic)).rejects.toThrow(new BadRequestException('CNPJ inválido'));
        })

        it('deve lançar um erro se o cnpj ja existir', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockClinicEntity);

            await expect(clinicsService.create(mockClinic)).rejects.toThrow(new NotFoundException('Already registered clinic'));
        })
    })
})