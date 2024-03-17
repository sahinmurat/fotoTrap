import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"


export class UserDto {
    @IsOptional()
    @ApiProperty()
    firstName: string

    @IsOptional()
    @ApiProperty()
    lastName: string

    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @ApiProperty()
    email: string
}