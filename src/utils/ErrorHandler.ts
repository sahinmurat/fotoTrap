import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorHandler {
    static sendError(error: any, message: string) {
        if (error instanceof HttpException) {
            throw error;
        }
        console.error(message, " : ", error);
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
}