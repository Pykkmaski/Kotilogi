import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';

export default async function FilesPage({ params }) {
  const id = params.propertyId;
  const files = await db('fileData')
    .join('objectData', { 'objectData.id': 'fileData.id' })
    .where({ parentId: id });

  return <Main>Tiedostot</Main>;
}
