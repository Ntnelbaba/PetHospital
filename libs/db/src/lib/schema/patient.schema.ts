import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FoodType } from '@pet-hospital/api-interfaces';
import { Document } from 'mongoose';

export type PatientDocument = PatientSchema & Document;
@Schema()
export class PatientSchema {
  @Prop()
  name: string;
  @Prop()
  petType: string;
  @Prop()
  foodTypes: FoodType[];
  @Prop()
  ownerName: string;
  @Prop()
  ownerAddress: string;
  @Prop()
  ownerPhone: string;
}
export const PatientSchemaFactory = SchemaFactory.createForClass(PatientSchema);
