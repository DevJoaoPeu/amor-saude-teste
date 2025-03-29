import { Test, TestingModule } from '@nestjs/testing';
import { ClinicsController } from '../clinics.controller';
import { IClinicsService } from '../interface/clinics.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { IRegionalService } from 'src/regionals/interface/regional.interface';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  body,
  clinicsNotFound,
  deleteReturn,
  errorResponse,
  regionalNotFound,
  userId,
} from './utils';

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

      await expect(clinicsController.create(body)).rejects.toEqual(
        errorResponse,
      );

      expect(clinicsService.create).toHaveBeenCalledTimes(1);
      expect(clinicsService.create).toHaveBeenCalledWith(1);
    });

    it('deve criar uma clínica', async () => {
      (clinicsService.create as jest.Mock).mockResolvedValue(body);

      const result = await clinicsController.create(body);

      expect(result).toEqual(body);
      expect(clinicsService.create).toHaveBeenCalledTimes(1);
      expect(clinicsService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('readOne', () => {
    it('deve retornar erro caso clínica nao exista', async () => {
      (clinicsService.readOne as jest.Mock).mockRejectedValue(clinicsNotFound);

      await expect(clinicsController.readOne(userId)).rejects.toEqual(
        clinicsNotFound,
      );

      expect(clinicsService.readOne).toHaveBeenCalledTimes(1);
      expect(clinicsService.readOne).toHaveBeenCalledWith(userId);
    });

    it('deve retornar uma clínica', async () => {
      (clinicsService.readOne as jest.Mock).mockResolvedValue(body);

      const result = await clinicsController.readOne(userId);

      expect(result).toEqual(body);
      expect(clinicsService.readOne).toHaveBeenCalledTimes(1);
      expect(clinicsService.readOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('readAll', () => {
    it('deve retornar uma lista de clínica', async () => {
      (clinicsService.readAll as jest.Mock).mockResolvedValue([body]);

      const result = await clinicsController.readAll();

      expect(result).toEqual([body]);
      expect(clinicsService.readAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('deve retornar erro caso clínica nao exista', async () => {
      (clinicsService.update as jest.Mock).mockRejectedValue(clinicsNotFound);

      await expect(clinicsController.update(body, userId)).rejects.toEqual(
        clinicsNotFound,
      );

      expect(clinicsService.update).toHaveBeenCalledTimes(1);
      expect(clinicsService.update).toHaveBeenCalledWith(body, userId);
    });

    it('deve atualizar uma clínica', async () => {
      (clinicsService.update as jest.Mock).mockResolvedValue(body);

      const result = await clinicsController.update(body, userId);
      expect(result).toEqual(body);
      expect(clinicsService.update).toHaveBeenCalledTimes(1);
      expect(clinicsService.update).toHaveBeenCalledWith(body, userId);
    });
  });

  describe('delete', () => {
    it('deve retornar erro caso clínica nao exista', async () => {
      (clinicsService.delete as jest.Mock).mockRejectedValue(clinicsNotFound);

      await expect(clinicsController.delete(userId)).rejects.toEqual(
        clinicsNotFound,
      );

      expect(clinicsService.delete).toHaveBeenCalledTimes(1);
      expect(clinicsService.delete).toHaveBeenCalledWith(userId);
    });

    it('deve deletar uma clínica', async () => {
      (clinicsService.delete as jest.Mock).mockResolvedValue(deleteReturn);

      const result = await clinicsController.delete(userId);
      expect(result).toEqual(deleteReturn);
      expect(clinicsService.delete).toHaveBeenCalledTimes(1);
      expect(clinicsService.delete).toHaveBeenCalledWith(userId);
    });
  });
});
