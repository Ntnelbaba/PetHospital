import { Module } from '@nestjs/common';
import { PatientsController } from './controllers/patients.controller';
import { DataProvidersModule } from '@pet-hospital/data-providers';
import { AppointmentsController } from './controllers/appointments.controller';

@Module({
  imports: [DataProvidersModule],
  controllers: [
    PatientsController,
    AppointmentsController
  ],
})
export class AppModule {}
