export interface IEncryptor {
  encrypt(password: string): Promise<string>;
  isEquals({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean>;
}
