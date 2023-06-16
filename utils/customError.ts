export default class CustomError extends Error {
  constructor(public message: string, public name: string) {
    super(message);
    this.name = name;
  }
}
