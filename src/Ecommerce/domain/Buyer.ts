import { uuid as uuidv4 } from "uuidv4";

export class Buyer {
  private readonly MIN_CHAR_USERNAME: number = process.env.MIN_USERNAME
    ? parseInt(process.env.MIN_USERNAME)
    : 4;

  private readonly MAX_CHAR_USERNAME: number = process.env.MAX_USERNAME
    ? parseInt(process.env.MAX_USERNAME)
    : 14;

  private readonly MIN_CHAR_PASSWORD: number = process.env.MAX_PASSWORD
    ? parseInt(process.env.MAX_PASSWORD)
    : 6;

  private readonly uuid: string;
  private readonly username: string;
  private readonly password: string;

  public constructor(username: string, password: string) {
    this.uuid = uuidv4();
    this.username = username;
    this.password = password;
  }

  public create(username: string, password: string) {
    const containSpace: RegExp = /\s/;
    const checkString: RegExp = /^[a-zA-Z0-9]+$/;

    if (username.length >= this.MIN_CHAR_USERNAME) {
      throw new Error(
        `Username requires at least ${this.MIN_CHAR_USERNAME} characters`
      ).message;
    }

    if (username.length > this.MAX_CHAR_USERNAME) {
      throw new Error(`Character range exceeded for username`).message;
    }

    if (containSpace.test(username)) {
      throw new Error(`This username can't contain characters with space`)
        .message;
    }

    if (!checkString.test(username)) {
      throw new Error(`This username can't contain symbols`).message;
    }

    if (password.length < this.MIN_CHAR_PASSWORD) {
      throw new Error(
        `This password requires at least ${this.MIN_CHAR_PASSWORD} characters`
      );
    }

    return new Buyer(username, password);
  }
}
