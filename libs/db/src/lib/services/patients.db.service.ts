import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PatientSchema, PatientSchemaDocument } from '../schema/patient.schema';
import {
  CreatePatientDto,
  UpdatePatientDto,
} from '@pet-hospital/api-interfaces';
import { Patient } from '../model/patient';

@Injectable()
export class PatientsDbService {
  constructor(
    @InjectModel(PatientSchema.name)
    private PatientModel: Model<PatientSchemaDocument>
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
    foodTypes: string[]
  ): Promise<PatientSchema> {
    const createdPatient = new this.PatientModel({
      ...createPatientDto,
      foodTypes,
    });
    return createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return (await this.PatientModel.find().populate('foodTypes').exec()).map(
      (patientFromDb) => new Patient(patientFromDb)
    );
  }
  async findOneById(id: string): Promise<Patient | null> {
    try {
      return this.PatientModel.findById(new Types.ObjectId(id))
        .populate('foodTypes')
        .exec()
        .then((result: PatientSchemaDocument) => {
          if (!result) {
            return null;
          }
          return new Patient(result);
        });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findByName(name: string): Promise<Patient[] | null> {
    try {
      return (
        await this.PatientModel.find({ name: name })
          .populate('foodTypes')
          .exec()
      ).map((patientFromDb) => new Patient(patientFromDb));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findOneAndUpdate(id: string, updatePatient: UpdatePatientDto) {
    try {
      return this.PatientModel.findByIdAndUpdate(new Types.ObjectId(id), {
        ...updatePatient,
      }).exec();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async findOneAndDelete(id: string) {
    try {
      return this.PatientModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
