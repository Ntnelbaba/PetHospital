import { Patient } from './patient';
import { Types } from 'mongoose';
import { PatientSchema } from '../schema/patient.schema';

export interface IAppointment {
  _id: Types.ObjectId;
  patient: PatientSchema;
  startTime: Date;
  endTime: Date;
  description: string;
  totalFee: number;
  feePaid: number;
  feeUnpaid: number;
}
export class Appointment {
  constructor(appointmentObject: Partial<IAppointment>) {
    this.id = appointmentObject._id?.toHexString();
    this.patient = new Patient(appointmentObject.patient);
    this.startTime = appointmentObject.startTime;
    this.endTime = appointmentObject.endTime;
    this.totalFee = appointmentObject.totalFee;
    this.feePaid = appointmentObject.feePaid;
    this.feeUnpaid = this.totalFee - this.feePaid;
  }
  id: string;
  patient: Patient;
  startTime: Date;
  endTime: Date;
  description: string;
  totalFee: number;
  feePaid: number;
  feeUnpaid: number;
}
