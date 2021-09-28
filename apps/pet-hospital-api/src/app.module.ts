import { Module } from '@nestjs/common';
import { PatientsController } from './controllers/patients.controller';
import { DataProvidersModule } from '@pet-hospital/data-providers';
import { AuthModule } from '@pet-hospital/auth';
import { AppointmentsController } from './controllers/appointments.controller';

@Module({
  controllers: [PatientsController, AppointmentsController],
  imports: [DataProvidersModule, AuthModule],
})
export class AppModule {}
