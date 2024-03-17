import { ApiProperty } from "@nestjs/swagger";

export class ILoginResponse {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    expiresAt: Date;

    @ApiProperty()
    email: string;
}