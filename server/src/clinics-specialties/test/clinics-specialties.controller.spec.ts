import { Test } from "@nestjs/testing";
import { ClinicsSpecialtiesController } from "../clinics-specialties.controller";
import { IClinicsSpecialtiesService } from "../interface/clinics-specialties.interface";
import { AuthGuard } from "src/guards/auth.guard";
import { ClinicsSpecialtiesEntity } from "../entities/clinics-specialties.entity";
import { CreateClinicsSpecialtiesDto } from "../dto/create-clinics-specialties.dto";

describe('ClinicsSpecialtiesController', () => {
    let controller: ClinicsSpecialtiesController;
    let service: IClinicsSpecialtiesService;

    const mockAuthGuard = {
        canActivate: jest.fn(() => true), 
    };

    const mockRelation: ClinicsSpecialtiesEntity = {
        id: '1',
        clinic: {
            id: '1',
            razaoSocial: 'razao social',
            nomeFantasia: 'nome fantasia',
            cnpj: '09.512.501/0001-21',
            dataInauguracao: new Date(),
            ativa: true,
            regional: {
                id: '123',
                name: 'Regional'
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        specialty: {
            id: '1',
            name: 'Specialty',
        }
    }

    const body: CreateClinicsSpecialtiesDto = {
        clinic: '1',
        specialty: '1',
    }

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ClinicsSpecialtiesController],
            providers: [
                {
                    provide: IClinicsSpecialtiesService,
                    useValue: {
                        create: jest.fn(),
                        readOne: jest.fn(),
                        readAll: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        clinicsSpecialtiesAlredyExists: jest.fn(),
                    },
                },
            ],
        })
        .overrideGuard(AuthGuard)
        .useValue(mockAuthGuard)
        .compile();

        controller = module.get<ClinicsSpecialtiesController>(ClinicsSpecialtiesController);
        service = module.get<IClinicsSpecialtiesService>(IClinicsSpecialtiesService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('deve criar um relacionamento entre clínica e especialidade', async () => {
            (service.create as jest.Mock).mockResolvedValue(mockRelation);

            const result = await controller.create(body);

            expect(result).toEqual(mockRelation);
        });
    })

    describe('readAll', () => {
        it('deve retornar todos os relacionamentos entre clínicas e especialidades', async () => {
            (service.readAll as jest.Mock).mockResolvedValue([mockRelation]);

            const result = await controller.readAll();

            expect(result).toEqual([mockRelation]);
        });
    })

    describe('readOne', () => {
        it('deve retornar um relacionamento entre clínica e especialidade', async () => {
            (service.readOne as jest.Mock).mockResolvedValue(mockRelation);

            const result = await controller.readOne('1');

            expect(result).toEqual(mockRelation);
        });
    });

    describe('update', () => {
        it('deve atualizar um relacionamento entre clínica e especialidade', async () => {
            (service.update as jest.Mock).mockResolvedValue(mockRelation);

            const result = await controller.update(body, '1');

            expect(result).toEqual(mockRelation);
        });
    })

    describe('delete', () => {
        it('deve deletar um relacionamento entre clínica e especialidade', async () => {
            (service.delete as jest.Mock).mockResolvedValue(mockRelation);

            const result = await controller.delete('1');

            expect(result).toEqual(mockRelation);
        });
    })
})