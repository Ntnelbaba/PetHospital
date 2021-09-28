import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreatePatientDto,
  UpdatePatientDto,
} from '@pet-hospital/api-interfaces';
import { AppointmentProvider, PatientProvider } from '@pet-hospital/data-providers';
import { Patient } from '@pet-hospital/db';

@ApiBearerAuth()
@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsProvider: PatientProvider,
    private readonly appointmentsProvider: AppointmentProvider
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiTags('Patients - CRUD')
  getAllPatients() {
    return this.patientsProvider.getAllPatients();
  }

  @Get('balance/:id')
  @ApiOperation({ summary: 'Get patient remaining balance' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiTags('Patients - General', 'Balance')
  getPatianceBalance(@Param('id') patientId: string) {
    return this.appointmentsProvider.getPatientBalance(patientId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new patient' })
  @ApiResponse({ status: 201, description: 'All Cool :)' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiTags('Patients - CRUD')
  newPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsProvider.newPatient(createPatientDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update specific patient' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiTags('Patients - CRUD')
  updatePatient(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto
  ) {
    return this.patientsProvider.updatePatient(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Update specific patient' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiTags('Patients - CRUD')
  deletePatient(@Param('id') id: string) {
    return this.patientsProvider.deletePatient(id);
  }
}
