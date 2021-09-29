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
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@pet-hospital/api-interfaces';
import { JwtAuthGuard } from '@pet-hospital/auth';
import { AppointmentProvider } from '@pet-hospital/data-providers';
import { Appointment } from '@pet-hospital/db';

@Controller('Appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsProvider: AppointmentProvider) {}
  @Get()
  @ApiOperation({ summary: 'Get all Appointments' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Appointment,
  })
  @ApiTags('Appointments - CRUD')
  getAllAppointments() {
    return this.appointmentsProvider.getAllAppointments();
  }

  @UseGuards(JwtAuthGuard)
  @Get('unpaid')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unpaid appointments' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiTags('Appointments - General', 'Balance', 'Authorize Needed')
  getUnpaidAppointments() {
    return this.appointmentsProvider.getUnpaidAppointments();
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get hospital balance' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiTags('Appointments - General', 'Balance', 'Authorize Needed')
  getHospitalBalance() {
    return this.appointmentsProvider.getHospitalBalance();
  }

  @Get(':date')
  @ApiOperation({ summary: 'Get all Appointments start in specific date' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Appointment,
  })
  @ApiTags('Appointments - General')
  getAllAppointmentsByDate(@Param('date') date: string) {
    return this.appointmentsProvider.getSpecificDateAppointments(
      new Date(date)
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create new Appointment' })
  @ApiResponse({ status: 201, description: 'All Cool :)' })
  @ApiTags('Appointments - CRUD')
  newAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsProvider.newAppointment(createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update specific Appointment' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Appointment,
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiTags('Appointments - CRUD', 'Authorize Needed')
  updateAppointment(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsProvider.updateAppointment(
      id,
      updateAppointmentDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update specific Appointment' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: Appointment,
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiTags('Appointments - CRUD', 'Authorize Needed')
  deleteAppointment(@Param('id') id: string) {
    return this.appointmentsProvider.deleteAppointment(id);
  }
}
