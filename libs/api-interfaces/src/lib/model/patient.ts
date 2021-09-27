import { Types } from 'mongoose';

export interface IPatient {
  _id: Types.ObjectId;
  name: string;
  petType: string;
  foodType: string[];
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
}
export class Patient {
  constructor(patientObject: Partial<IPatient>) {
    this.id = patientObject._id.toHexString();
    this.name = patientObject.name;
    this.petType = patientObject.petType;
    this.foodType = patientObject.foodType;
    this.ownerName = patientObject.ownerName;
    this.ownerPhone = patientObject.ownerPhone;
    this.ownerAddress = patientObject.ownerAddress;
  }
  id: string;
  name: string;
  petType: string;
  foodType: string[];
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
}
