import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
    @ApiProperty({ example: 401, description: 'Status code' })
    statusCode: number;

    @ApiProperty({ example: 'Unauthorized', description: 'Error message' })
    message: string;
}

export class ForbiddenResponse {
    @ApiProperty({ example: 403, description: 'Status code' })
    statusCode: number;

    @ApiProperty({ example: 'Forbidden resource', description: 'Error message' })
    message: string;
}

export class NotFoundResponse {
    @ApiProperty({ example: 404, description: 'Status code' })
    statusCode: number;

    @ApiProperty({ example: 'Not found', description: 'Error message' })
    message: string;
}

export class InternalServerError {
    @ApiProperty({ example: 500, description: 'Status code' })
    statusCode: number;

    @ApiProperty({ example: 'Internal server error', description: 'Error message' })
    message: string;
}



