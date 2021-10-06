class AppError {
  constructor(message, status = 400) {
    this.message = message;
    this.status = status;
    this.stack = new Error().stack;
  }
}

export default AppError;
