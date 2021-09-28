import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FoodTypeSchema, FoodTypeDocument } from '../schema/food-type.schema';
import { CreateFoodTypeDto, FoodType } from '@pet-hospital/api-interfaces';

@Injectable()
export class FoodTypeDbService {
  constructor(
    @InjectModel(FoodTypeSchema.name)
    private FoodTypeModel: Model<FoodTypeDocument>
  ) {}

  async create(createFoodTypeDto: CreateFoodTypeDto): Promise<FoodTypeSchema> {
    const createdFoodType = new this.FoodTypeModel(createFoodTypeDto);
    return createdFoodType.save();
  }
  async findByPetType(petType: string): Promise<FoodType[] | null> {
    try {
      return (await this.FoodTypeModel.find({ petType }).exec()).map(
        (petFoodTypes) => new FoodType(petFoodTypes)
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findAndDeleteByPetType(petType: string) {
    try {
      return this.FoodTypeModel.find({ petType }, (err, res) => {
        res.forEach((foodType) =>
          this.FoodTypeModel.findByIdAndDelete(foodType._id)
        );
      }).exec();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
