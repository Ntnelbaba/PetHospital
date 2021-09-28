import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './modules/appointment.module';
import { FoodTypesModule } from './modules/food-type.module';
import { PatientsModule } from './modules/patients.module';

@Module({
  imports: [
    PatientsModule,
    AppointmentsModule,
    FoodTypesModule,
    MongooseModule.forRoot('mongodb://localhost/pethospital'),
  ],
  exports: [PatientsModule, FoodTypesModule, AppointmentsModule],
})
export class DbModule {}
