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
    CreateAppointmentDto,
    UpdateAppointmentDto,
  } from '@pet-hospital/api-interfaces';
  import { AppointmentProvider } from '@pet-hospital/data-providers';
import { Appointment } from '@pet-hospital/db';
  
  @ApiBearerAuth()
  @ApiTags('Appointments-CRUD')
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
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    getAllAppointments() {
      return this.appointmentsProvider.getAllAppointments();
    }
  
    @Post()
    @ApiOperation({ summary: 'Create new Appointment' })
    @ApiResponse({ status: 201, description: 'All Cool :)' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    newAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
      return this.appointmentsProvider.newAppointment(createAppointmentDto);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update specific Appointment' })
    @ApiResponse({
      status: 200,
      description: 'All Cool :)',
      type: Appointment,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    updateAppointment(
      @Param('id') id: string,
      @Body() updateAppointmentDto: UpdateAppointmentDto
    ) {
      return this.appointmentsProvider.updateAppointment(id, updateAppointmentDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Update specific Appointment' })
    @ApiResponse({
      status: 200,
      description: 'All Cool :)',
      type: Appointment,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    deleteAppointment(@Param('id') id: string) {
      return this.appointmentsProvider.deleteAppointment(id);
    }
  }
  