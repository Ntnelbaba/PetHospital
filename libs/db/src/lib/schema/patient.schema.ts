import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaFromMongoose} from 'mongoose';
import { FoodTypeSchema } from './food-type.schema';

export type PatientSchemaDocument = PatientSchema & Document;
@Schema()
export class PatientSchema {
  @Prop()
  name: string;
  @Prop()
  petType: string;
  @Prop({ type: [{ type: SchemaFromMongoose.Types.ObjectId, ref: 'FoodTypeSchema' }] })
  foodTypes: FoodTypeSchema[];
  @Prop()
  ownerName: string;
  @Prop()
  ownerAddress: string;
  @Prop()
  ownerPhone: string;
}
export const PatientSchemaFactory = SchemaFactory.createForClass(PatientSchema);
