import { IRegionalService } from "src/regionals/interface/regional.interface";
import { IClinicsService } from "../interface/clinics.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { ClinicsService } from "../clinics.service";
import { Repository } from "typeorm";
import { ClinicEntity } from "../entities/clinics.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('', () => {
    let clinicsService: IClinicsService;
    let regionalService: IRegionalService;
    let repository: Repository<ClinicEntity>;

    beforeEach(async () => {
        const mockRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
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
                        regionalService: jest.fn()
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
})