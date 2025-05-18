export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super('You already checked in today.')
  }
}
