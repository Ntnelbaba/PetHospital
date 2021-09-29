import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyProvider } from '../currency/currency.provider';
import { AppointmentProvider } from './appointment.provider';
import { createMock } from '@golevelup/ts-jest';
import { Appointment, AppointmentsDbService } from '@pet-hospital/db';
import { NotFoundException } from '@nestjs/common';

const emptyApponintment = {
  id: '0',
  patient: {
    id: '0',
    foodTypes: [],
    name: 'test',
    owner: null,
    petType: '',
  },
  totalFee: 0,
  feePaid: 0,
  feeUnpaid: 0,
  description: '',
  startTime: new Date(Date.now()),
  endTime: new Date(Date.now()),
} as Appointment;

describe('AppointmentProvider', () => {
  let service: AppointmentProvider;
  let appointmentsDbService: AppointmentsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentProvider],
      providers: [
        {
          provide: CurrencyProvider,
          useValue: createMock<CurrencyProvider>(),
        },
        {
          provide: AppointmentsDbService,
          useValue: createMock<AppointmentsDbService>(),
        },
      ],
    }).compile();

    service = module.get(AppointmentProvider);
    appointmentsDbService = module.get(AppointmentsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateAppointment', () => {
    it('should throw NotFoundException when no appointment found', async () => {
      jest
        .spyOn(appointmentsDbService, 'findOneAndUpdate')
        .mockImplementation(async () => Promise.resolve(null));
      try {
        await service.updateAppointment('1', null);
      } catch (error) {
        expect(error instanceof NotFoundException).toBeTruthy();
      }
    });
  });

  describe('deleteAppointment', () => {
    it('should throw NotFoundException when no appointment found', async () => {
      jest
        .spyOn(appointmentsDbService, 'findOneAndDelete')
        .mockImplementation(async () => Promise.resolve(null));
      try {
        await service.deleteAppointment('1');
      } catch (error) {
        expect(error instanceof NotFoundException).toBeTruthy();
      }
    });
  });

  describe('getPatientBalance', () => {
    it('should get balance string', async () => {
      jest
        .spyOn(appointmentsDbService, 'findByPatient')
        .mockImplementation(async () => Promise.resolve([emptyApponintment]));
      const balanceString = await service.getPatientBalance('1');
      const expectedString = service.patientBalanceString
        .replace('{name}', emptyApponintment.patient.name)
        .replace('{total}', `${emptyApponintment.totalFee}`)
        .replace('{paid}', `${emptyApponintment.feePaid}`)
        .replace('{unpaid}', `${emptyApponintment.feeUnpaid}`);
      expect(balanceString).toBe(expectedString);
    });
    it('should throw NotFoundException when no appointment found', async () => {
      jest
        .spyOn(appointmentsDbService, 'findByPatient')
        .mockImplementation(async () => Promise.resolve(null));
      try {
        await service.getPatientBalance('1');
      } catch (error) {
        expect(error instanceof NotFoundException).toBeTruthy();
      }
    });
  });

  describe('getHospitalBalance', () => {
    it('should get hospital balance string', async () => {
      jest
        .spyOn(appointmentsDbService, 'findByDate')
        .mockImplementation(async () => Promise.resolve([emptyApponintment]));
      const balanceString = await service.getHospitalBalance();
      const expectedString = service.hospitalBalanceString
        .replace('{weekly.total}', `${emptyApponintment.totalFee}`)
        .replace('{weekly.paid}', `${emptyApponintment.feePaid}`)
        .replace('{weekly.unpaid}', `${emptyApponintment.feeUnpaid}`)
        .replace('{monthly.total}', `${emptyApponintment.totalFee}`)
        .replace('{monthly.paid}', `${emptyApponintment.feePaid}`)
        .replace('{monthly.unpaid}', `${emptyApponintment.feeUnpaid}`);
      expect(balanceString).toBe(expectedString);
    });
    it('should throw NotFoundException when no appointment found', async () => {
      jest
        .spyOn(appointmentsDbService, 'findByDate')
        .mockImplementation(async () => Promise.resolve(null));
      try {
        await service.getHospitalBalance();
      } catch (error) {
        expect(error instanceof NotFoundException).toBeTruthy();
      }
    });
  });

  describe('_extractBalanceFromAppointments', () => {
    it('should return null when undefined array recieved', () => {
      const appointments = undefined;
      const response = service._extractBalanceFromAppointments(appointments);
      expect(response).toBeNull();
    });
    it('should return null when no array recieved', () => {
      const appointments = null;
      const response = service._extractBalanceFromAppointments(appointments);
      expect(response).toBeNull();
    });
    it('should return null when empty array recieved', () => {
      const appointments = [];
      const response = service._extractBalanceFromAppointments(appointments);
      expect(response).toBeNull();
    });
    it('should calc the balance to expected answer', () => {
      const balanceExpected = {
        total: 20,
        unpaid: 10,
        paid: 10,
      };
      const refillAppointment = {
        ...emptyApponintment,
        feePaid: balanceExpected.paid,
        feeUnpaid: balanceExpected.unpaid,
        totalFee: balanceExpected.total,
      };
      const appointments = [refillAppointment];
      const response = service._extractBalanceFromAppointments(appointments);
      expect(response).toMatchObject(balanceExpected);
    });
  });
});
