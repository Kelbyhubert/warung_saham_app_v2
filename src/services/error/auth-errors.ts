export class CustomAuthError extends Error {
  private code: string;
  private status: number | undefined;
  private errors?: any;
  private errorMessage: string;
  constructor(
    code: string,
    status: number | undefined,
    errors: any,
    errorMessage: string,
    message?: string
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.errorMessage = errorMessage;
    this.errors = errors;
  }
}
