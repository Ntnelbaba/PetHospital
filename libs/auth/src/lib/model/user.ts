import { ApiProperty } from "@nestjs/swagger";

export class User {
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}