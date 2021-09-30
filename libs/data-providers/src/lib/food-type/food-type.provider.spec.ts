import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { FoodTypeProvider } from './food-type.provider';
import { createMock } from '@golevelup/ts-jest';
import {
  FoodType,
  FoodTypeDbService,
  FoodTypeDocument,
} from '@pet-hospital/db';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';

const basicFoodTypeItem = { barcode: '123', genericName: 'test' } as FoodType;

describe('FoodTypeProvider', () => {
  let service: FoodTypeProvider;
  let httpService: HttpService;
  let foodTypeDbService: FoodTypeDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodTypeProvider],
      providers: [
        {
          provide: FoodTypeDbService,
          useValue: createMock<FoodTypeDbService>(),
        },
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    service = module.get(FoodTypeProvider);
    httpService = module.get(HttpService);
    foodTypeDbService = module.get(FoodTypeDbService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPetFoodTypes', () => {
    it('should call handleFoodTypeFromDb when response received', async () => {
      service.handleFoodTypeFromDb = jest.fn();
      jest
        .spyOn(foodTypeDbService, 'findIdsByPetType')
        .mockImplementation(() => Promise.resolve(null));
      await service.getPetFoodTypes('test');
      expect(service.handleFoodTypeFromDb).toHaveBeenCalledTimes(1);
    });
    it('should call handleErrorFromDb when response rejected', async () => {
      service.handleErrorFromDb = jest.fn();
      jest
        .spyOn(foodTypeDbService, 'findIdsByPetType')
        .mockImplementation(() => Promise.reject(null));
      await service.getPetFoodTypes('test');
      expect(service.handleErrorFromDb).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleFoodTypeFromDb', () => {
    it('should returned types if received', async () => {
      const foodTypesToReceive = ['1234'];
      const response = await service.handleFoodTypeFromDb(
        '',
        foodTypesToReceive
      );
      expect(response).toBe(foodTypesToReceive);
    });
  });

  describe('handleErrorFromDb', () => {
    it('should console the error or general message', async () => {
      console.error = jest.fn();
      service.registerNewPetTypeFood = jest.fn();
      await service.handleErrorFromDb('', new NotFoundException());
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('registerNewPetTypeFood', () => {
    it('should return empty array when no random food generated', async () => {
      service.makeRandomFoodTypes = () => Promise.resolve([]);
      const response = await service.registerNewPetTypeFood('test');
      expect(response).toStrictEqual([]);
    });
    it('should return id`s as random food created', async () => {
      const idExpected = '1';
      service.makeRandomFoodTypes = () => Promise.resolve([basicFoodTypeItem]);
      jest.spyOn(foodTypeDbService, 'create').mockImplementation(() =>
        Promise.resolve({
          genericName: basicFoodTypeItem.genericName,
          barcode: basicFoodTypeItem.barcode,
          petType: 'test',
          _id: { toHexString: () => idExpected },
        } as FoodTypeDocument)
      );
      const response = await service.registerNewPetTypeFood('test');
      expect(response).toContain(idExpected);
    });
  });

  describe('makeRandomFoodTypes', () => {
    const randomReturn = 5;
    beforeEach(() => {
      jest.spyOn(Math, 'floor').mockImplementation(() => randomReturn);
      service._getRandomBarcode = jest
        .fn()
        .mockImplementation(() => `${randomReturn}`);
    });
    it('should return empty array when no food found', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => of(null));
      const response = await service.makeRandomFoodTypes();
      expect(response).toStrictEqual([]);
      expect(service._getRandomBarcode).toBeCalledTimes(randomReturn);
    });
    it('should return array with 1 food', async () => {
      const foodTypeExpected = { barcode: 1, genericName: 'test' };
      service.extractFoodType = jest
        .fn()
        .mockImplementationOnce((...args) => {
          args[3].push(foodTypeExpected);
          return { i: args[1], retry: args[2] };
        })
        .mockImplementation((...args) => ({
          i: args[1]--,
          retry: args[2]--,
        }));
      const response = await service.makeRandomFoodTypes();
      expect(response).toStrictEqual([foodTypeExpected]);
    });
  });
});
