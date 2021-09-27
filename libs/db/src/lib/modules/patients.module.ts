import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsDbService } from '../services/patients.db.service';
import { PatientSchema, PatientSchemaFactory } from '../schema/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PatientSchema.name, schema: PatientSchemaFactory }]),
  ],
  providers: [PatientsDbService],
  exports: [PatientsDbService]
})
export class PatientsModule {}
