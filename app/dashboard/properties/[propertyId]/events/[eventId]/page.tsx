import { Main } from '@/components/New/Main';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import db from 'kotilogi-app/dbconfig';
import { EventOverview } from '../_components/EventOverview';
import { FileDataType } from 'kotilogi-app/dataAccess/types';
import { FileCard } from '@/components/New/FileCard';
import { EventDetails } from './_EventDetails/EventDetails';
import { redirect } from 'next/navigation';
import { events } from 'kotilogi-app/dataAccess/events';
import { files } from 'kotilogi-app/dataAccess/files';
import { EventDocument } from './_EventDetails/EventDocument';
import { ReactNode } from 'react';

export default async function EventPage({ params }) {
  const eventId = params.eventId;

  //Fetch data back-to-back to conserve db connection pool.
  const [eventData] = await events.get({ id: eventId });
  if (!eventData) redirect(`/dashboard/properties/${params.propertyId}/events`);
  const [extraData] = await events.getExtraData(eventId);

  const fileData = (await files.get({ parentId: eventId }, 4)) as FileDataType[];
  const [mainImageId] = (await db('data_mainImages')
    .where({ objectId: eventId })
    .pluck('imageId')) as [string];

  const DataField = ({ label, value }: { label: ReactNode; value: any }) => {
    const getValue = () => {
      if (typeof value === 'boolean') {
        return (value && 'Kyllä') || 'Ei';
      } else {
        return value || 'Ei määritelty';
      }
    };

    return (
      <div className='flex flex-col'>
        <label className='text-slate-500'>{label}</label>
        <span className='font-semibold'>{getValue() || 'Ei määritelty'}</span>
      </div>
    );
  };

  const DataGroup = ({ children }) => (
    <div className='grid lg:grid-cols-3 xs:grid-cols-2 gap-4'>{children}</div>
  );

  const getHeatingSystemNamePrefix = () => {
    const label = extraData.newSystemLabel;
    return label == 'Kaukolämpö'
      ? 'Lämmönjakokeskuksen'
      : label === 'Öljy'
      ? 'Öljylämmityskeskuksen'
      : null;
  };

  const getDataContent = () => {
    const { mainTypeLabel, targetLabel } = eventData;

    if (mainTypeLabel === 'Peruskorjaus') {
      if (targetLabel === 'Lämmitysmuoto') {
        return (
          <>
            <DataGroup>
              <DataField
                label='Vanha järjestelmä'
                value={extraData.oldSystemLabel}
              />
              <DataField
                label='Uusi järjestelmä'
                value={extraData.newSystemLabel}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label={getHeatingSystemNamePrefix() + ' ' + 'merkki'}
                value={extraData.newSystemBrandLabel || 'Ei määritelty'}
              />

              <DataField
                label={getHeatingSystemNamePrefix() + ' ' + 'malli'}
                value={extraData.newSystemModelLabel || 'Ei määritelty'}
              />
            </DataGroup>
          </>
        );
      } else if (targetLabel === 'Katto') {
        return (
          <>
            <DataGroup>
              <DataField
                label='Katon tyyppi'
                value={extraData.typeLabel}
              />

              <DataField
                label='Katon materiaali'
                value={extraData.materialLabel}
              />

              <DataField
                label='Väri'
                value={extraData.colorLabel}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label='Räystästyyppi'
                value={extraData.raystasTyyppiLabel}
              />

              <DataField
                label='Otsalautatyyppi'
                value={extraData.otsalautaTyyppiLabel}
              />

              <DataField
                label='Aluskatetyyppi'
                value={extraData.aluskateTyyppiLabel}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label='Kaltevuus'
                value={extraData.kaltevuus}
              />

              <DataField
                label={
                  <>
                    Neliömetrit <sup>m2</sup>
                  </>
                }
                value={extraData.kaltevuus}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label='Harjatuuletus aluskatteella'
                value={extraData.harjatuuletusAluskatteella}
              />

              <DataField
                label='Suojakäsitelty puutavara'
                value={extraData.suojakasiteltyPuutavara}
              />

              <DataField
                label='Piipunpellitys'
                value={extraData.piipunpellitys}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label='Seinätikas'
                value={extraData.seinatikas}
              />

              <DataField
                label='Kattosilta'
                value={extraData.kattosilta}
              />

              <DataField
                label='Lapetikas'
                value={extraData.lapetikas}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label='Lumieste'
                value={extraData.lumieste}
              />

              <DataField
                label='Turvatikas'
                value={extraData.turvatikas}
              />

              <DataField
                label='Lapetikas'
                value={extraData.lapetikas}
              />
            </DataGroup>

            <DataGroup>
              <DataField
                label='Kourut'
                value={extraData.kourut}
              />

              <DataField
                label='Syöksysarja'
                value={extraData.syoksysarja}
              />
            </DataGroup>
          </>
        );
      }
    }
    return null;
  };

  return (
    <Main>
      <SecondaryHeading>Tapahtuma</SecondaryHeading>
      <EventDocument
        title={eventData.title}
        description={eventData.description || 'Ei kuvausta.'}
        date={eventData.date}>
        <div className='flex lg:flex-row xs:flex-col w-full h-full'>
          <div className='flex flex-col gap-4 w-full'>{getDataContent()}</div>
          {fileData.length ? (
            <div className='grid grid-cols-4 w-full gap-2'>
              {fileData.map(f => (
                <FileCard
                  file={f}
                  isMain={f.id == mainImageId}
                />
              ))}
            </div>
          ) : (
            <div className='flex w-full h-full items-center justify-center'>
              <span>Ei tiedostoja</span>
            </div>
          )}
        </div>
      </EventDocument>
    </Main>
  );
}
