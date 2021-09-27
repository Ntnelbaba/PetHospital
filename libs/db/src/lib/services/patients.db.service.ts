import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PatientSchema, PatientDocument } from '../schema/patient.schema';
import {
  CreatePatientDto,
  Patient,
  UpdatePatientDto,
} from '@pet-hospital/api-interfaces';

@Injectable()
export class PatientsDbService {
  constructor(
    @InjectModel(PatientSchema.name)
    private PatientModel: Model<PatientDocument>
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<PatientSchema> {
    const createdPatient = new this.PatientModel(createPatientDto);
    return createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return (await this.PatientModel.find().exec()).map(
      (patientFromDb) => new Patient(patientFromDb)
    );
  }
  async findOneById(id: string): Promise<Patient | null> {
    try {
      return this.PatientModel.findById(new Types.ObjectId(id))
        .exec()
        .then((result: PatientDocument) => {
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
      return (await this.PatientModel.find({ name: name }).exec()).map(
        (patientFromDb) => new Patient(patientFromDb)
      );
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
