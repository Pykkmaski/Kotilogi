import db from 'kotilogi-app/dbconfig';

/**Returns an object containing within it properties with the types defined in the ref-tables given as arguments. */
export async function getRefs(...args: string[]) {
  const refs = {};

  for (const arg of args) {
    if (!arg.startsWith('ref_')) {
      throw new Error('Invalid ref table name! (' + arg + ')');
    }

    const vals = await db(arg);
    const label = arg.split('ref_')[1];
    refs[label] = vals;
  }

  return refs as any;
}
