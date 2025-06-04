class HttpException extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.codeError = message.replace(/\s+/g, '_').toUpperCase();
  }
}

module.exports = HttpException;
