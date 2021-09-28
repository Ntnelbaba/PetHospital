import { Module } from '@nestjs/common';
import { DbModule } from '@pet-hospital/db';
import { PatientProvider } from './patient/patient.provider';
import { HttpModule } from '@nestjs/axios';
import { FoodTypeProvider } from './food-type/food-type.provider';
import { AppointmentProvider } from './appointment/appointment.provider';
import { CurrencyProvider } from './currency/currency.provider';

@Module({
  imports: [DbModule, HttpModule],
  providers: [
    PatientProvider,
    FoodTypeProvider,
    AppointmentProvider,
    CurrencyProvider,
  ],
  exports: [PatientProvider, AppointmentProvider],
})
export class DataProvidersModule {}
