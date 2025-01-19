import { Repository } from "typeorm";
import { ClinicsSpecialtiesServices } from "../clinics-specialties.service";
import { ClinicsSpecialtiesEntity } from "../entities/clinics-specialties.entity";
import { IClinicsService } from "src/clinics/interface/clinics.interface";
import { ISpecialtiesService } from "src/specialties/interface/specialties.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('ClinicsSpecialtiesService', () => {
    let service: ClinicsSpecialtiesServices;
    let repository: Repository<ClinicsSpecialtiesEntity>;
    let clinicService: IClinicsService;
    let specialtiesService: ISpecialtiesService;

    beforeEach(async () => {
        const mockRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClinicsSpecialtiesServices,
                {
                    provide: getRepositoryToken(ClinicsSpecialtiesEntity),
                    useValue: mockRepository, 
                },
                {
                    provide: IClinicsService,
                    useValue: {
                        readOne: jest.fn(),
                        clinicsAlredyExists: jest.fn()
                    }
                },
                {
                    provide: ISpecialtiesService,
                    useValue: {
                        readOne: jest.fn(),
                        specialtiesAlredyExists: jest.fn()
                    }
                },
                {
                    provide: ClinicsSpecialtiesServices,
                    useValue: {
                        create: jest.fn(),
                        readAll: jest.fn(),
                        readOne: jest.fn(),
                        update: jest.fn()
                    }
                }
            ]
        }).compile()

        service = module.get<ClinicsSpecialtiesServices>(ClinicsSpecialtiesServices);
        repository = module.get<Repository<ClinicsSpecialtiesEntity>>(getRepositoryToken(ClinicsSpecialtiesEntity));
        clinicService = module.get<IClinicsService>(IClinicsService);
        specialtiesService = module.get<ISpecialtiesService>(ISpecialtiesService);

    })

    it ('should be defined', () => {
        expect(service).toBeDefined();
    })
})