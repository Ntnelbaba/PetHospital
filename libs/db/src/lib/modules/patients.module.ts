import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsDbService } from '../services/patients.db.service';
import { PatientSchema, PatientSchemaFactory } from '../schema/patient.schema';
import { FoodTypesModule } from './food-type.module';

@Module({
  imports: [
    FoodTypesModule,
    MongooseModule.forFeature([{ name: PatientSchema.name, schema: PatientSchemaFactory }]),
  ],
  providers: [PatientsDbService],
  exports: [PatientsDbService]
})
export class PatientsModule {}
