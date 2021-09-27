import { Module } from '@nestjs/common';
import { PatientsController } from './crud/patients.controller';
import { DataProvidersModule } from '@pet-hospital/data-providers';

@Module({
  imports: [DataProvidersModule],
  controllers: [PatientsController],
})
export class AppModule {}
