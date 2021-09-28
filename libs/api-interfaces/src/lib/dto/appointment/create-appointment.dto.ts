import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
    @ApiProperty()
    patient: string;
    @ApiProperty()
    startTime: Date;
    @ApiProperty()
    endTime: Date;
    @ApiProperty()
    description: string;
    @ApiProperty()
    totalFee: number;
    @ApiProperty()
    feePaid: number;
    @ApiProperty()
    currencyPaid: string;
}