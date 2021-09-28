import { FoodType } from '@pet-hospital/db';
import { Types } from 'mongoose';
import { FoodTypeSchema } from '../schema/food-type.schema';

export interface IPatient {
  _id: Types.ObjectId;
  name: string;
  petType: string;
  foodTypes: FoodTypeSchema[];
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
}
export class Patient {
  constructor(patientObject: Partial<IPatient>) {
    this.id = patientObject._id?.toHexString();
    this.name = patientObject.name;
    this.petType = patientObject.petType;
    this.foodTypes = patientObject.foodTypes.map(type => new FoodType(type));
    this.ownerName = patientObject.ownerName;
    this.ownerPhone = patientObject.ownerPhone;
    this.ownerAddress = patientObject.ownerAddress;
  }
  id: string;
  name: string;
  petType: string;
  foodTypes: FoodType[];
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
}
