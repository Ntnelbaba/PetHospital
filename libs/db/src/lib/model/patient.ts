import { Types } from 'mongoose';
import { FoodTypeSchema } from '../schema/food-type.schema';
import { FoodType } from './food-type';

export interface IPatient {
  _id: Types.ObjectId;
  name: string;
  petType: string;
  foodTypes: FoodTypeSchema[];
  owner: {
    _id: Types.ObjectId;
    name: string;
    address: string;
    phone: string;
  };
}
export interface IOwner {
  id: string;
  name: string;
  address: string;
  phone: string;
}
export class Patient {
  constructor(patientObject: Partial<IPatient>) {
    this.id = patientObject._id?.toHexString();
    this.name = patientObject.name;
    this.petType = patientObject.petType;
    this.foodTypes = patientObject.foodTypes.map((type) => new FoodType(type));
    this.owner = {
      id: patientObject.owner._id?.toHexString(),
      name: patientObject.owner.name,
      address: patientObject.owner.address,
      phone: patientObject.owner.phone,
    };
  }
  id: string;
  name: string;
  petType: string;
  foodTypes: FoodType[];
  owner: IOwner;
}
