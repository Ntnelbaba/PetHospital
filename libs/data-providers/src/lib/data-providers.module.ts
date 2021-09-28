import { Module } from '@nestjs/common';
import { DbModule } from '@pet-hospital/db';
import { PatientProvider } from './patient/patient.provider';
import { HttpModule } from '@nestjs/axios';
import { FoodTypeProvider } from './food-type/food-type.provider';
import { AppointmentProvider } from './appointment/appointment.provider';

@Module({
  imports: [DbModule, HttpModule],
  providers: [PatientProvider, FoodTypeProvider, AppointmentProvider],
  exports: [PatientProvider, AppointmentProvider],
})
export class DataProvidersModule {}
