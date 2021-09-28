import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaFromMongoose } from 'mongoose';
import { PatientSchema } from './patient.schema';

export type AppointmentSchemaDocument = AppointmentSchema & Document;
@Schema()
export class AppointmentSchema {
  @Prop({ type: SchemaFromMongoose.Types.ObjectId, ref: 'PatientSchema' })
  patient: PatientSchema;
  @Prop()
  startTime: Date;
  @Prop()
  endTime: Date;
  @Prop()
  description: string;
  @Prop()
  totalFee: number;
  @Prop()
  feePaid: number;
}
export const AppointmentSchemaFactory =
  SchemaFactory.createForClass(AppointmentSchema);
