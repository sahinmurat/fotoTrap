import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty } from "class-validator"
import { ComponentType } from "../models/component-type.enum"

export class ComponentDto {
    @IsNotEmpty()
    @ApiProperty({
        enum: ComponentType,
        description: 'Type of component',
        default: ComponentType.OTHER 
      })
    @IsEnum(ComponentType, { message: 'Invalid component type' })
    type: ComponentType

    @IsNotEmpty()
    @ApiProperty()
    createdDate: string
}