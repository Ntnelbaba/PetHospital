import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodTypesModule } from './modules/food-type.module';
import { PatientsModule } from './modules/patients.module';

@Module({
  imports: [
    PatientsModule,
    FoodTypesModule,
    MongooseModule.forRoot('mongodb://localhost/pethospital'),
  ],
  exports: [PatientsModule, FoodTypesModule],
})
export class DbModule {}
