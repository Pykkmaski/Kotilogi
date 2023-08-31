"use server";

import crypto from 'crypto';

export default async function generateId(): Promise<string>{
    return Promise.resolve(crypto.randomBytes(32).toString('hex'));
}