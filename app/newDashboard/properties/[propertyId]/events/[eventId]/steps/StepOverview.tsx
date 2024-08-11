import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventStepDataType } from 'kotilogi-app/models/types';

export const StepOverview = async ({
  step,
  showEnabled,
}: {
  step: EventStepDataType;
  showEnabled?: boolean;
}) => {
  const [mainImageId] = await db('data_mainImages').where({ objectId: step.id }).pluck('imageId');

  return (
    <OverviewBox
      title={step.title}
      description={
        <div className='flex flex-col w-full gap-4'>
          <Paragraph>{step.description || 'Ei kuvausta.'}</Paragraph>
          <LabelGrid>
            <LabelGrid.Entry
              label={'Aika'}
              value={step.time && new Date(parseInt(step.time)).toLocaleDateString()}
            />
          </LabelGrid>
        </div>
      }
      showUrl={showEnabled && `steps/${step.id}`}
      deleteUrl={`steps/${step.id}/delete`}
      editContentText='Muokkaa'
      editIcon={<Edit />}
      editUrl={`steps/${step.id}/edit`}
      imageUrl={(mainImageId && `/api/files/${mainImageId}`) || '/img/room.jpg'}
    />
  );
};
