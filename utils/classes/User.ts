import db from 'kotilogi-app/dbconfig';
import { AppObject } from './AppObject';
import bcrypt from 'bcrypt';
import { Property } from './Property';
import { Knex } from 'knex';

export enum UserError {
  DUPLICATE = 0x1,
  PASSWORD_MISMATCH = 0x2,
  NOT_FOUND = 0x4,
}

type UserType = Kotidok.UserType & {
  properties: Map<string, Property>;
};

export class User extends AppObject<UserType> {
  public static async saveUser(user: User, trx?: Knex.Transaction) {
    await super.save(async con => {
      const { properties, ...data } = user.data;
      const propertyValues = Array.from(properties.values());
      await Promise.all(propertyValues.map(p => Property.saveProperty(p, con)));
      await con('users').where({ email: user.data.email }).update(user.data);
    });
  }

  public static async loadUser(email: string) {
    const [[user], properties] = (await Promise.all([
      db('users').where({ email }),
      db('properties').where({ refId: email }),
    ])) as [[Kotidok.UserType], Kotidok.PropertyType[]];

    if (!user) return null;
    const propertyMap = new Map();

    for (const p of properties) {
      const property = await Property.loadProperty(p.id);
      propertyMap.set(p.id, property);
    }

    return new User({
      ...user,
      properties: propertyMap,
    });
  }

  public async updatePassword(oldPassword: string, newPassword: string) {
    const passwordOk = await bcrypt.compare(oldPassword, this.data.password);
    if (!passwordOk) return UserError.PASSWORD_MISMATCH;
    this.data.password = await bcrypt.hash(newPassword, 15);
    return 0;
  }
}
