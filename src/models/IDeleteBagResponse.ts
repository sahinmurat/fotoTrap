import { ApiProperty } from "@nestjs/swagger"

export class IDeleteBagResponse {
    @ApiProperty()
    success: boolean

    @ApiProperty()
    message: string
}