import { HttpStatus } from "@nestjs/common";

export class Message {
    constructor() { }

    trace(message: any, httpStatus: HttpStatus) {
        var code: number;
        var messageLast: any;
        switch (httpStatus) {
            case 200:
                code = 200;
                messageLast = message;
                break;
            case 400:
                code = 400;
                messageLast = message;
                break;
            case 201:
                code = 201;
                messageLast = message;
                break;
            case 500:
                code = 500;
                messageLast = "Error Servidor";
                break;
            default:
                break;
        }
        return {
            statusCode: code,
            message: message
        }
    }
}