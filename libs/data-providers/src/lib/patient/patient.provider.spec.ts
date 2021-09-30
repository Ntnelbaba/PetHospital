import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePatientDto } from '@pet-hospital/api-interfaces';
import { PatientsDbService } from '@pet-hospital/db';
import { FoodTypeProvider } from '../food-type/food-type.provider';
import { PatientProvider } from './patient.provider';

describe('PatientProvider', () => {
  let service: PatientProvider;
  let foodTypeProvider: FoodTypeProvider;
  let patientsDbService: PatientsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientProvider],
      providers: [
        {
          provide: FoodTypeProvider,
          useValue: createMock<FoodTypeProvider>(),
        },
        {
          provide: PatientsDbService,
          useValue: createMock<PatientsDbService>(),
        },
      ],
    }).compile();

    service = module.get(PatientProvider);
    foodTypeProvider = module.get(FoodTypeProvider);
    patientsDbService = module.get(PatientsDbService);
    jest
      .spyOn(foodTypeProvider, 'getPetFoodTypes')
      .mockImplementation(jest.fn());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updatePatient', () => {
    it('should throw NotFoundException when no result', async () => {
      jest
        .spyOn(patientsDbService, 'findOneAndUpdate')
        .mockImplementation(() => Promise.resolve(null));
      try {
        await service.updatePatient('', { petType: '' } as UpdatePatientDto);
      } catch (error) {
        expect(error instanceof NotFoundException).toBeTruthy();
      }
    });
  });

  describe('deletePatient', () => {
    it('should throw NotFoundException when no result', async () => {
      jest
        .spyOn(patientsDbService, 'findOneAndDelete')
        .mockImplementation(() => Promise.resolve(null));
      try {
        await service.deletePatient('');
      } catch (error) {
        expect(error instanceof NotFoundException).toBeTruthy();
      }
    });
  });
});
