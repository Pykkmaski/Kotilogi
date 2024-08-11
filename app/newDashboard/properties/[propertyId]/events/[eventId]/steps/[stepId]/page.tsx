import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { FileCard } from '@/components/New/FileCard';
import { Main } from '@/components/New/Main';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { StepOverview } from '../StepOverview';

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
      <StepOverview step={step} />

      <FileOverview
        files={files}
        showAllUrl={`${params.stepId}/files`}
        addNewUrl={`/newDashboard/files/add?parentId=${params.stepId}`}
        PreviewComponent={({ item }) => {
          return (
            <FileCard
              file={item}
              isMain={item.id == mainImageId}
            />
          );
        }}
      />
    </Main>
  );
}
