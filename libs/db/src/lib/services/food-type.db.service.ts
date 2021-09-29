import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FoodTypeSchema, FoodTypeDocument } from '../schema/food-type.schema';
import { CreateFoodTypeDto } from '@pet-hospital/api-interfaces';
import { FoodType } from '../model/food-type';

@Injectable()
export class FoodTypeDbService {
  constructor(
    @InjectModel(FoodTypeSchema.name)
    private FoodTypeModel: Model<FoodTypeDocument>
  ) {}

  async create(
    createFoodTypeDto: CreateFoodTypeDto
  ): Promise<FoodTypeDocument> {
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
  async findIdsByPetType(petType: string): Promise<string[] | null> {
    try {
      return (await this.FoodTypeModel.find({ petType }).exec()).map(
        (petFoodTypes) => petFoodTypes._id.toHexString()
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findSchemasByPetType(
    petType: string
  ): Promise<FoodTypeDocument[] | null> {
    try {
      return await this.FoodTypeModel.find({ petType }).exec();
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
