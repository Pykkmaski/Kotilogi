import db from 'kotilogi-app/dbconfig';

export async function getFiles(query: TODO, limit?: number) {
  return db('data_objects')
    .join('data_files', { 'data_files.id': 'data_objects.id' })
    .where(query)
    .select('data_objects.*', 'data_files.name', 'data_files.size', 'data_files.type')
    .limit(limit);
}
