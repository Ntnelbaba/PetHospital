import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodTypeDto {
  @ApiProperty()
  petType: string;
  @ApiProperty()
  barcode: string;
  @ApiProperty()
  genericName: string;
}
