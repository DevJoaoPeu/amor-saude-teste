import { Test, TestingModule } from "@nestjs/testing";
import { ClinicsController } from "../clinics.controller";
import { IClinicsService } from "../interface/clinics.interface";
import { AuthGuard } from "src/guards/auth.guard";
import { IRegionalService } from "src/regionals/interface/regional.interface";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { body, regionalNotFound } from "./utils";
import { errorResponse } from "src/auth/test/utils";

describe('ClinicsController', () => {
    let clinicsController: ClinicsController;
    let clinicsService: IClinicsService;  
    
    const mockAuthGuard = {
        canActivate: jest.fn(() => true), 
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClinicsController],
            providers: [
                {
                    provide: IClinicsService,
                    useValue: {
                        create: jest.fn(),
                        readOne: jest.fn(),
                        readAll: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        clinicsAlredyExists: jest.fn(),
                    },
                },
            ],
        })
        .overrideGuard(AuthGuard)
        .useValue(mockAuthGuard)
        .compile();

        clinicsController = module.get<ClinicsController>(ClinicsController);
        clinicsService = module.get<IClinicsService>(IClinicsService);
    });

    it('deve estar definido', () => {
        expect(clinicsController).toBeDefined();
    });

    describe('create', () => {
        it('deve retornar erro caso regional não exista', async () => {
            (clinicsService.create as jest.Mock).mockRejectedValue(errorResponse);
        
            await expect(clinicsController.create(body)).rejects.toEqual(errorResponse);
        
            expect(clinicsService.create).toHaveBeenCalledTimes(1);
            expect(clinicsService.create).toHaveBeenCalledWith(body);
        });
    });
});