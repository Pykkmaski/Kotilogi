import z from 'zod';

export function isUUID(val: string) {
  const uuidSchema = z.string().uuid();
  try {
    uuidSchema.parse(val);
    return true;
  } catch (err) {
    return false;
  }
}
