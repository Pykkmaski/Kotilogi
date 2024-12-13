'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import { usePropertyFormContext } from './PropertyFormContext';
import { DataDisplay } from '@/components/UI/DataDisplay';
import { Check, Clear } from '@mui/icons-material';
import { PropertyPayloadType } from 'kotilogi-app/dataAccess/types';
import { Notification } from '@/components/UI/Notification';

export function PropertyOverview() {
  const { property: prop, heatingBatch, refs, isValid } = usePropertyFormContext();
  const property = prop || ({} as PropertyPayloadType);

  return (
    <BoxFieldset legend='Yhteenveto'>
      <div className='flex flex-col gap-8 lg:w-[50%] xs:w-full'>
        <div className='flex flex-col gap-2'>
          <h1>Yleistiedot</h1>

          <DataDisplay
            title='Kiinteistötunnus'
            value={property.propertyNumber || 'Ei määritelty'}
          />

          <DataDisplay
            title='Kiinteistötyyppi'
            value={refs.propertyTypes.find(t => t.id == property.property_type_id)?.name}
          />
          <DataDisplay
            title='Kadun nimi'
            value={property.street_name}
          />

          <DataDisplay
            title='Talon numero'
            value={property.street_number}
          />

          {isValid ? (
            <Notification
              variant='success'
              position='start'>
              Kiinteistö on vahvistettu
            </Notification>
          ) : (
            <Notification
              variant='error'
              position='start'>
              Kiinteistötunnus on virheellinen!
            </Notification>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <h1>Ulkopuoli</h1>
          <DataDisplay
            title='Rakennusmateriaali'
            value={
              refs.buildingMaterials.find(mat => mat.id == property.building_material_id)?.name ||
              'Ei määritelty'
            }
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h1>Sisätilat</h1>

          <DataDisplay
            title='Huoneiden lukumäärä'
            value={property.room_count || 'Ei määritelty'}
          />

          <DataDisplay
            title='Vessojen lukumäärä'
            value={property.bathroom_count || 'Ei määritelty'}
          />

          <DataDisplay
            title={
              <>
                Asuintilojen pinta-ala <sup>m2</sup>
              </>
            }
            value={property.living_area || 'Ei määritelty'}
          />

          <DataDisplay
            title={
              <>
                Muu pinta-ala <sup>m2</sup>
              </>
            }
            value={property.other_area || 'Ei määritelty'}
          />

          <DataDisplay
            title={
              <>
                Pinta-ala- yhteensä <sup>m2</sup>
              </>
            }
            value={property.living_area + property.other_area || 'Ei määritelty'}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h1>Tontti</h1>

          <DataDisplay
            title='Omistus'
            value={property.yardOwnershipTypeId || 'Ei määritelty'}
          />
          <DataDisplay
            title={
              <>
                Pinta-ala<sup>m2</sup>
              </>
            }
            value={property.yardArea || 'Ei määritelty'}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h1>Lämmitys</h1>

          {heatingBatch.length ? (
            heatingBatch.map(hb => {
              const ht = refs.heatingTypes.find(t => t.id == hb.value.heating_type_id)?.name;
              return (
                <DataDisplay
                  title={ht}
                  value={hb.value.is_primary ? <span>Ensisijainen</span> : ' '}
                />
              );
            })
          ) : (
            <span className='font-semibold'>Ei lämmitysmuotoja.</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <h1>Muut tiedot</h1>

          <DataDisplay
            title='Autotalli'
            value={(property.has_garage as any) == 'on' || property.has_garage ? 'Kyllä' : 'Ei'}
          />
        </div>
      </div>
    </BoxFieldset>
  );
}
