import { ApiProperty } from '@nestjs/swagger';
import { CurrencyType } from '../../enum/currency-type.enum';

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
  @ApiProperty({ enum: CurrencyType, example: 'USD|EUR|CAD' })
  currencyPaid: CurrencyType;
}
