import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@pet-hospital/api-interfaces';
import { Appointment, AppointmentsDbService } from '@pet-hospital/db';
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
    return this.appointmentsDbService
      .findOneAndUpdate(id, updateAppointmentDto)
      .then((res) => {
        if (!res)
          throw new NotFoundException(`Appointment id: ${id} not found!`);
        return res;
      });
  }
  deleteAppointment(id: string) {
    return this.appointmentsDbService.findOneAndDelete(id).then((res) => {
      if (!res) throw new NotFoundException(`Appointment id: ${id} not found!`);
      return res;
    });
  }
  getSpecificDateAppointments(date: Date) {
    return this.appointmentsDbService.findByDate(date);
  }
  getUnpaidAppointments() {
    return this.appointmentsDbService.findUnpaid();
  }
  getPatientBalance(patientId: string) {
    return this.appointmentsDbService.findByPatient(patientId).then((res) => {
      const balance = this._extractBalanceFromAppointments(res);
      if (!balance) {
        throw new NotFoundException(`Patient ${patientId} not found.`);
      }
      return `
        Patient '${res[0].patient.name}' Balance
        
        Total: ${balance.total}, Paid: ${balance.paid}, Remaining: ${balance.unpaid}
      `;
    });
  }
  async getHospitalBalance() {
    const dateNow = new Date(Date.now());
    const dateWithToday = new Date(Date.now());
    dateWithToday.setDate(dateWithToday.getDate() + 1);
    const dateMonthAgo = new Date(dateNow);
    dateMonthAgo.setMonth(dateNow.getMonth() - 1);
    const dateWeekAgo = new Date(dateNow);
    dateWeekAgo.setDate(dateNow.getDate() - 7);
    return this.appointmentsDbService
      .findByDate(dateMonthAgo, dateWithToday)
      .then((appointments) => {
        const monthlyBalance =
          this._extractBalanceFromAppointments(appointments);
        if (!monthlyBalance) {
          throw new NotFoundException(`No appointments found.`);
        }
        const weeklyBalance = this._extractBalanceFromAppointments(
          appointments.filter(
            (appointment) =>
              appointment.startTime > dateWeekAgo &&
              appointment.startTime > dateMonthAgo
          )
        );
        return `
        Hospital Balance

        Weekly: Total ${weeklyBalance.total}, Paid: ${weeklyBalance.paid}, Remaining: ${weeklyBalance.unpaid} 
        Monthly: Total ${monthlyBalance.total}, Paid: ${monthlyBalance.paid}, Remaining: ${monthlyBalance.unpaid} 
        `;
      });
  }

  _extractBalanceFromAppointments(appointments: Appointment[]): {
    total: number;
    unpaid: number;
    paid: number;
  } {
    if (!appointments || appointments?.length === 0) {
      return null;
    }
    let balancePaid = 0,
      balanceUnpaid = 0;
    appointments.forEach((appointment) => {
      balancePaid += appointment.feePaid;
      balanceUnpaid += appointment.feeUnpaid;
    });
    return {
      total: balanceUnpaid + balancePaid,
      unpaid: balanceUnpaid,
      paid: balancePaid,
    };
  }
}
