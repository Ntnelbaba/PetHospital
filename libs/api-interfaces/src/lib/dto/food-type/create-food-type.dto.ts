import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodTypeDto {
    @ApiProperty()
    petType: string;
    @ApiProperty()
    foodType: string;
}