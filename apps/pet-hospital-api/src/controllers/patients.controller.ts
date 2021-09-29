import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
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
import { JwtAuthGuard } from '@pet-hospital/auth';
import { AppointmentProvider, PatientProvider } from '@pet-hospital/data-providers';
import { Patient } from '@pet-hospital/db';

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
  @ApiTags('Patients - CRUD')
  getAllPatients() {
    return this.patientsProvider.getAllPatients();
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get patient remaining balance' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiTags('Patients - General', 'Balance', 'Authorize Needed')
  getPatianceBalance(@Param('id') patientId: string) {
    return this.appointmentsProvider.getPatientBalance(patientId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new patient' })
  @ApiResponse({ status: 201, description: 'All Cool :)' })
  @ApiTags('Patients - CRUD')
  newPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsProvider.newPatient(createPatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update specific patient' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiTags('Patients - CRUD', 'Authorize Needed')
  updatePatient(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto
  ) {
    return this.patientsProvider.updatePatient(id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update specific patient' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiTags('Patients - CRUD', 'Authorize Needed')
  deletePatient(@Param('id') id: string) {
    return this.patientsProvider.deletePatient(id);
  }
}
