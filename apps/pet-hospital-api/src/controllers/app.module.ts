import { Module } from '@nestjs/common';
import { PatientsController } from './crud/patients.controller';
import { DataProvidersModule } from '@pet-hospital/data-providers';
import { AppointmentsController } from './crud/appointments.controller';

@Module({
  imports: [DataProvidersModule],
  controllers: [PatientsController, AppointmentsController],
})
export class AppModule {}
