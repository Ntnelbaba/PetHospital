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
import { PatientProvider } from '@pet-hospital/data-providers';
import { Patient } from '@pet-hospital/db';

@ApiBearerAuth()
@ApiTags('patients-CRUD')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsProvider: PatientProvider) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Patient,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getAllPatients() {
    return this.patientsProvider.getAllPatients();
  }

  @Post()
  @ApiOperation({ summary: 'Create new patient' })
  @ApiResponse({ status: 201, description: 'All Cool :)' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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
  deletePatient(@Param('id') id: string) {
    return this.patientsProvider.deletePatient(id);
  }
}
