import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@pet-hospital/api-interfaces';
import { AppointmentsDbService } from '@pet-hospital/db';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppointmentProvider {
  constructor(private readonly appointmentsDbService: AppointmentsDbService) {}
  getAllAppointments() {
    return this.appointmentsDbService.findAll();
  }
  async newAppointment(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsDbService.create({
      ...createAppointmentDto,
    });
  }
  updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsDbService.findOneAndUpdate(
      id,
      updateAppointmentDto
    ).then((res) => {
      if (!res) throw new NotFoundException(`Appointment id: ${id} not found!`);
      return res;
    });
  }
  deleteAppointment(id: string) {
    return this.appointmentsDbService.findOneAndDelete(id).then((res) => {
      if (!res) throw new NotFoundException(`Appointment id: ${id} not found!`);
      return res;
    });
  }
}
