export class InvalidCredentialsError extends Error {
  constructor() {
    super('User is invalid')
  }
}
