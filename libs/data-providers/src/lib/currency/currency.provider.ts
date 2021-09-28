import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CurrencyType } from '@pet-hospital/api-interfaces';

@Injectable()
export class CurrencyProvider {
  exchangeRates: Record<string, number>;
  constructor(private http: HttpService) {
      this.getExchangeRates();
  }
  convertToDollar(amount: number, currency: CurrencyType) {
    switch (currency) {
      case CurrencyType.USD:
        return amount;
      default:
        return this.exchangeRates[currency] * amount;
    }
  }
  getExchangeRates() {
    return this.http
      .get('https://open.er-api.com/v6/latest/USD')
      .subscribe((json) => {
        this.exchangeRates = json.data?.rates;
      });
  }
}
