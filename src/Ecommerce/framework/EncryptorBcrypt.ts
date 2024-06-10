import bcrypt from "bcrypt";

import { IEncryptor } from "../domain/IEncryptor";

export class EncryptorBcrypt implements IEncryptor {
  async encrypt(password: string): Promise<string> {
    const hash: string = await bcrypt
      .hash(password, process.env.SALT || 6)
      .catch((err) => {
        console.log(`Hashed error: ${err}`);
        throw new Error(`Internal error, try again later!`);
      });

    return hash;
  }

  async isEquals({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
