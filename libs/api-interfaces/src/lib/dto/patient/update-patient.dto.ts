import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    petType: string;
    @ApiProperty()
    ownerName: string;
    @ApiProperty()
    ownerPhone: string;
    @ApiProperty()
    ownerAddress: string;
}