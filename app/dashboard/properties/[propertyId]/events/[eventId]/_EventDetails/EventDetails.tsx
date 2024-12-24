'use client';

import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { createContext, useMemo } from 'react';
import { RoofContent } from './RoofContent';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { HeatingTypeContent } from './HeatingTypeContent';
import { BoxHeader, BoxTitle } from '@/components/New/Boxes/BoxHeader';
import { Info } from '@mui/icons-material';
import { KayttovesiputketContent } from './KayttovesiputketContent';
import { ViemariputketContent } from './ViemariputketContent';
import { EristeContent } from './EristeContent';
import { DrainageDitchContent } from './DrainageDitchContent';
import { FalseInput } from '@/components/UI/FalseInput';

const EventDetailsContext = createContext<{ mainData: EventPayloadType; extraData: any } | null>(
  null
);

type EventDetailsProps = {
  eventData: EventPayloadType;
  extraData: any;
};

export const EventDetails = ({ eventData, extraData }: EventDetailsProps) => {
  const content = useMemo(() => {
    const { mainTypeLabel, targetLabel } = eventData;
    let content = null;
    if (mainTypeLabel === 'Peruskorjaus') {
      if (targetLabel === 'Salaojat') {
        content = (
          <>
            <FalseInput
              label='Toteutustapa'
              value={extraData.toteutusTapaLabel}
              variant='field'
            />

            <FalseInput
              label={'Salaojasepeli'}
              value={extraData.salaojaSepeli}
              variant='field'
            />

            <FalseInput
              label={'Murskereunus'}
              value={extraData.murskeReunus}
              variant='field'
            />

            <FalseInput
              label={'Routaeristys'}
              value={extraData.salaojaSepeli}
              variant='field'
            />

            <FalseInput
              label={'Sadevesiputket'}
              value={extraData.sadevesiPutket}
              variant='checkbox'
            />

            <FalseInput
              label={'Pumppukaivo'}
              value={extraData.pumppuKaivo}
              variant='checkbox'
            />

            <FalseInput
              label={'Kalliotyö'}
              value={extraData.kallioTyo}
              variant='checkbox'
            />

            <FalseInput
              label={'Suodatinkangas'}
              value={extraData.suodatinKangas}
              variant='checkbox'
            />

            <FalseInput
              label={'Tarkastuskaivot'}
              value={extraData.tarkastusKaivot}
              variant='checkbox'
            />
          </>
        );
      } else if (targetLabel === 'Eristys') {
        content = (
          <>
            <FalseInput
              label='Materiaali'
              value={extraData.materialLabel}
              variant='field'
            />

            <FalseInput
              label='Kohde'
              value={extraData.targetLabel}
              variant='field'
            />
          </>
        );
      } else if (targetLabel === 'Katto') {
        content = (
          <>
            <FalseInput
              label='Tyyppi'
              value={extraData.typeLabel}
              variant='field'
            />

            <FalseInput
              label='Materiaali'
              value={extraData.materialLabel}
              variant='field'
            />

            <FalseInput
              label='Kaltevuus'
              value={extraData.kaltevuus}
              variant='field'
            />

            <FalseInput
              label='Neliömetrit'
              value={extraData.neliometrit}
              variant='field'
            />

            <FalseInput
              label='Väri'
              value={extraData.colorLabel}
              variant='field'
            />

            <FalseInput
              label='Räystästyyppi'
              value={extraData.raystasTyyppiLabel}
              variant='field'
            />

            <FalseInput
              label='Aluskatetyyppi'
              value={extraData.aluskateTyyppiLabel}
              variant='field'
            />

            <FalseInput
              label='Harjatuuletus aluskatteella'
              value={extraData.hajratuuletusAluskatteella}
              variant='checkbox'
            />

            <FalseInput
              label='Suojakäsitelty puutavara'
              value={extraData.suojakasiteltyPuutavara}
              variant='checkbox'
            />

            <FalseInput
              label='Piipunpellitys'
              value={extraData.piipunpellitys}
              variant='checkbox'
            />

            <FalseInput
              label='Seinätikas'
              value={extraData.seinatikas}
              variant='checkbox'
            />

            <FalseInput
              label='Lapetikas'
              value={extraData.lapetikas}
              variant='checkbox'
            />

            <FalseInput
              label='Lumieste'
              value={extraData.lumieste}
              variant='checkbox'
            />

            <FalseInput
              label='Kattosilta'
              value={extraData.kattosilta}
              variant='checkbox'
            />

            <FalseInput
              label='Turvatikas'
              value={extraData.turvatikas}
              variant='checkbox'
            />

            <FalseInput
              label='Kourut'
              value={extraData.kourut}
              variant='checkbox'
            />

            <FalseInput
              label='Syöksysarja'
              value={extraData.syoksysarja}
              variant='checkbox'
            />
          </>
        );
      } else if (targetLabel === 'Viemäriputket') {
        content = (
          <>
            <FalseInput
              label='Toteutustapa'
              value={extraData.toteutustapaLabel}
              variant='field'
            />
          </>
        );
      } else if (targetLabel === 'Käyttövesiputket') {
        content = (
          <>
            <FalseInput
              label='Asennustapa'
              value={extraData.asennustapaLabel}
              variant='field'
            />
          </>
        );
      } else if (targetLabel === 'Lämmitysmuoto') {
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
        <div className='flex gap-2 flex-wrap'>{content}</div>
      </ContentBox>
    ) : null;
  }, [extraData, eventData.mainTypeLabel, eventData.targetLabel]);

  return (
    <EventDetailsContext.Provider
      value={{
        extraData,
        mainData: eventData,
      }}>
      {content}
    </EventDetailsContext.Provider>
  );
};

export const useEventDetailsContext = createUseContextHook(
  'EventDetailsContext',
  EventDetailsContext
);
