import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { Main } from '@/components/New/Main';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';

export default async function StepPage({ params }) {
  const [step] = await db('data_objects')
    .join('data_propertyEventSteps', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({
      'data_objects.id': params.stepId,
    });

  const files = await db('data_objects')
    .join('data_files', { 'data_files.id': 'data_objects.id' })
    .where({
      parentId: params.stepId,
    });

  const [mainImageId] =
    (await db('data_mainImages').where({ objectId: params.stepId }).pluck('imageId')) || [];
  return (
    <Main>
      <SecondaryHeading>Vaihe</SecondaryHeading>
      <OverviewBox
        title={step.title}
        description={step.description}
        editIcon={<Edit />}
        editUrl={`${params.stepId}/edit`}
        editContentText='Muokkaa'
        deleteUrl={`${params.stepId}/delete`}
        imageUrl={(mainImageId && `/api/files/${mainImageId}`) || '/img/room.jpg'}
      />

      <FileOverview files={files} />
    </Main>
  );
}
