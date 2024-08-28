'use server';

import { revalidatePath as nextRevalidatePath } from 'next/cache';
export async function revalidatePath(path: string, type?: 'page' | 'layout') {
  nextRevalidatePath(path, type);
}
