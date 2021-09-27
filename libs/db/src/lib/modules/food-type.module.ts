import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodTypeDbService } from '../services/food-type.db.service';
import { FoodTypeSchema, FoodTypeSchemaFactory } from '../schema/food-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FoodTypeSchema.name, schema: FoodTypeSchemaFactory }]),
  ],
  providers: [FoodTypeDbService],
  exports: [FoodTypeDbService]
})
export class FoodTypesModule {}
