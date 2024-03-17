import { ApiProperty } from "@nestjs/swagger";

export class IRefreshTokenResponse {
    @ApiProperty()
    accessToken: string;
  
    @ApiProperty()
    expiresAt: Date;
    
    @ApiProperty()
    email: string;
}