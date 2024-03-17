export class ErrorGenerator extends Error {
    type: string
    status: number = 500
    constructor(type: string, message: string, status?: number) {
        super(message)
        this.name = 'ErrorGenerator'
        this.type = type
        if (status) {
            this.status = status
        }
    }
}
