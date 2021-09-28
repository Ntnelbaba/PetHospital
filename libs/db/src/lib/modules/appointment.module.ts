import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsDbService } from '../services/appointment.db.service';
import { AppointmentSchema, AppointmentSchemaFactory } from '../schema/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AppointmentSchema.name, schema: AppointmentSchemaFactory }]),
  ],
  providers: [AppointmentsDbService],
  exports: [AppointmentsDbService]
})
export class AppointmentsModule {}
