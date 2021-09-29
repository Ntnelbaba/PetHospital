import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { CurrencyProvider } from './currency.provider';
import { createMock } from '@golevelup/ts-jest';
import { CurrencyType } from '@pet-hospital/api-interfaces';
import { of } from 'rxjs';

describe('CurrencyProvider', () => {
  let service: CurrencyProvider;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyProvider],
      providers: [
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    service = module.get(CurrencyProvider);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertToDollar', () => {
    it('should return the same amount', () => {
      service.exchangeRates = {};
      const amount = 123455;
      const convertedAmount = service.convertToDollar(amount, CurrencyType.USD);
      expect(convertedAmount).toBe(amount);
    });
    it('should return the amount * exchanged rate', () => {
      const exchangeRate = 1.1;
      service.exchangeRates = {};
      service.exchangeRates[CurrencyType.CAD] = exchangeRate;
      service.exchangeRates[CurrencyType.EUR] = exchangeRate;
      const amount = 123455;
      const convertedAmountCAD = service.convertToDollar(
        amount,
        CurrencyType.CAD
      );
      const convertedAmountEUR = service.convertToDollar(
        amount,
        CurrencyType.EUR
      );
      expect(convertedAmountCAD).toBe(amount * exchangeRate);
      expect(convertedAmountEUR).toBe(amount * exchangeRate);
    });
  });

  describe('getExchangeRates', () => {
    it('should exchange rate be null when data not recieved', () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of());
      service.getExchangeRates();
      expect(service.exchangeRates).toBeUndefined();
    });
  });
});
