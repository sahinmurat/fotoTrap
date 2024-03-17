import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { ComponentType } from "../models/component-type.enum"

export class ComponentDto {
    @IsNotEmpty()
    @ApiProperty()
    type: ComponentType

    @IsNotEmpty()
    @ApiProperty()
    createdDate: string
}