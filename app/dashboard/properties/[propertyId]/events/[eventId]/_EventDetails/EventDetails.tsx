'use client';

import { LabelGrid } from '@/components/New/LabelGrid';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { createContext } from 'react';
import { HormiContent } from './HormiContent';
import { RoofContent } from './RoofContent';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { HeatingTypeContent } from './HeatingTypeContent';
import { BoxHeader, BoxTitle } from '@/components/New/Boxes/BoxHeader';
import { Info } from '@mui/icons-material';
import { KayttovesiputketContent } from './KayttovesiputketContent';
import { ViemariputketContent } from './ViemariputketContent';
import { EristeContent } from './EristeContent';

const EventDetailsContext = createContext<{ mainData: EventDataType; extraData: any } | null>(null);

type EventDetailsProps = {
  eventData: EventDataType;
  extraData: any;
};

export const EventDetails = ({ eventData, extraData }: EventDetailsProps) => {
  const getContent = () => {
    const { mainTypeLabel, targetLabel } = eventData;
    let content = null;
    switch (mainTypeLabel) {
      case 'Peruskorjaus': {
        switch (targetLabel) {
          case 'Katto':
            content = <RoofContent />;
            break;

          case 'Lämmitysmuoto':
            content = <HeatingTypeContent />;
            break;

          case 'Käyttövesiputket':
            content = <KayttovesiputketContent />;
            break;

          case 'Viemäriputket':
            content = <ViemariputketContent />;
            break;

          case 'Eristys':
            content = <EristeContent />;
            break;
        }
      }
    }

    return content ? (
      <ContentBox>
        <BoxHeader>
          <BoxTitle
            icon={<Info />}
            text='Lisätiedot'
          />
        </BoxHeader>
        <div className='flex flex-col gap-4'>{content}</div>
      </ContentBox>
    ) : null;
  };

  return (
    <EventDetailsContext.Provider
      value={{
        extraData,
        mainData: eventData,
      }}>
      {getContent()}
    </EventDetailsContext.Provider>
  );
};

export const useEventDetailsContext = createUseContextHook(
  'EventDetailsContext',
  EventDetailsContext
);
