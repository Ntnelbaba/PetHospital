import {
  CreatePatientDto,
  UpdatePatientDto,
} from '@pet-hospital/api-interfaces';
import { PatientsDbService } from '@pet-hospital/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodTypeProvider } from '../food-type/food-type.provider';

@Injectable()
export class PatientProvider {
  constructor(
    private readonly patientsDbService: PatientsDbService,
    private foodTypeProvider: FoodTypeProvider
  ) {}
  getAllPatients() {
    return this.patientsDbService.findAll();
  }
  async newPatient(createPatientDto: CreatePatientDto) {
    return this.patientsDbService.create(
      {
        ...createPatientDto,
      },
      await this.foodTypeProvider.getPetFoodTypes(createPatientDto.petType)
    );
  }
  updatePatient(id: string, updatePatientDto: UpdatePatientDto) {
    return this.patientsDbService
      .findOneAndUpdate(id, updatePatientDto)
      .then((res) => {
        if (!res) throw new NotFoundException(`Patient id: ${id} not found!`);
        return res;
      });
  }
  deletePatient(id: string) {
    return this.patientsDbService.findOneAndDelete(id).then((res) => {
      if (!res) throw new NotFoundException(`Patient id: ${id} not found!`);
      return res;
    });
  }
}
