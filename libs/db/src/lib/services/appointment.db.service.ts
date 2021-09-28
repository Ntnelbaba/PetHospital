import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AppointmentSchema,
  AppointmentSchemaDocument,
} from '../schema/appointment.schema';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@pet-hospital/api-interfaces';
import { Appointment } from '../model/appointment';

@Injectable()
export class AppointmentsDbService {
  constructor(
    @InjectModel(AppointmentSchema.name)
    private AppointmentModel: Model<AppointmentSchemaDocument>
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<AppointmentSchema> {
    const createdAppointment = new this.AppointmentModel({
      ...createAppointmentDto,
    });
    return createdAppointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return (
      await this.AppointmentModel.find()
        .populate({ path: 'patient', populate: 'foodTypes' })
        .exec()
    ).map((AppointmentFromDb) => new Appointment(AppointmentFromDb));
  }
  async findOneById(id: string): Promise<Appointment | null> {
    try {
      return this.AppointmentModel.findById(new Types.ObjectId(id))
        .populate({ path: 'patient', populate: 'foodTypes' })
        .exec()
        .then((result: AppointmentSchemaDocument) => {
          if (!result) {
            return null;
          }
          return new Appointment(result);
        });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findByPatient(patientId: string): Promise<Appointment[] | null> {
    try {
      return (
        await this.AppointmentModel.find({
          'patient.$id': new Types.ObjectId(patientId),
        })
          .populate({ path: 'patient', populate: 'foodTypes' })
          .exec()
      ).map((AppointmentFromDb) => new Appointment(AppointmentFromDb));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findOneAndUpdate(id: string, updateAppointment: UpdateAppointmentDto) {
    try {
      return this.AppointmentModel.findByIdAndUpdate(new Types.ObjectId(id), {
        $set: {
          ...updateAppointment,
          patient: new Types.ObjectId(updateAppointment.patient),
        },
      }).exec();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findOneAndDelete(id: string) {
    try {
      return this.AppointmentModel.findByIdAndDelete(
        new Types.ObjectId(id)
      ).exec();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
