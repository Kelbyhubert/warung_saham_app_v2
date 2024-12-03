import { AxiosError } from "axios"

export class HttpError extends Error{
    private status: number | undefined
    private errors? : any
    private errorMessage : string
    constructor(status: number | undefined, errors: any , errorMessage: string, message?: string){
        super(message);
        this.status = status;
        this.errorMessage = errorMessage
        this.errors = errors;
    }
}