import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PatientSchema } from './Patient.schema';

export type AppointmentDocument = Appointment & Document;
@Schema()
export class Appointment {
    @Prop({ type: Types.ObjectId, ref: 'Patient' })
    patient: PatientSchema;
    @Prop()
    start_time: Date;
    @Prop()
    end_time: Date;
    @Prop()
    description: string;
    @Prop()
    total_fee: string;
    @Prop()
    fee_paid: string;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);