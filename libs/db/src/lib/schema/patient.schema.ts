import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaFromMongoose, Types } from 'mongoose';
import { FoodTypeSchema } from './food-type.schema';

export type PatientSchemaDocument = PatientSchema & Document;
@Schema()
export class Owner {
  _id: Types.ObjectId;
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  phone: string;
}
@Schema()
export class PatientSchema {
  @Prop()
  name: string;
  @Prop()
  petType: string;
  @Prop({
    type: [{ type: SchemaFromMongoose.Types.ObjectId, ref: 'FoodTypeSchema' }],
  })
  foodTypes: FoodTypeSchema[];
  @Prop({ subtype: Owner })
  owner: Owner;
}
export const PatientSchemaFactory = SchemaFactory.createForClass(PatientSchema);
