import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class LoginDto {
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @ApiProperty()
    email: string
}