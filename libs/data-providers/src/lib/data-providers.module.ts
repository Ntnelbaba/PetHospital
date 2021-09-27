import { Module } from '@nestjs/common';
import { DbModule } from '@pet-hospital/db';
import { PatientProvider } from './patient/patient.provider';

@Module({
  imports: [DbModule],
  providers: [PatientProvider],
  exports: [PatientProvider],
})
export class DataProvidersModule {}
