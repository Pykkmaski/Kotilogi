'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import { usePropertyFormContext } from './PropertyFormContext';
import { DataDisplay } from '@/components/UI/DataDisplay';

export function PropertyOverview() {
  const { property: prop, heatingBatch, refs } = usePropertyFormContext();
  const property = prop || {};

  return (
    <BoxFieldset legend='Yhteenveto'>
      <div className='flex flex-col gap-8 lg:w-[50%] xs:w-full'>
        <div className='flex flex-col gap-2'>
          <h1>Yleistiedot</h1>
          <DataDisplay
            title='Kiinteistötunnus'
            value={property.propertyNumber}
          />

          <DataDisplay
            title='Kiinteistötyyppi'
            value={property.propertyTypeId}
          />
          <DataDisplay
            title='Katuosoite'
            value={property.streetAddress}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h1>Ulkopuoli</h1>
          <DataDisplay
            title='Rakennusmateriaali'
            value={
              refs.buildingMaterials.find(mat => mat.id == property.building_material_id)?.name
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
            title='Asuintilojen pinta-ala'
            value={property.living_area + 'm2' || 'Ei määritelty'}
          />

          <DataDisplay
            title='Muu pinta-ala'
            value={property.other_area + 'm2' || 'Ei määritelty'}
          />

          <DataDisplay
            title='Pinta-ala yhteensä'
            value={property.living_area + property.other_area + ' m2' || 'Ei määritelty'}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h1>Tontti</h1>
          <DataDisplay
            title='Omistus'
            value={property.yardOwnershipTypeId || 'Ei määritelty'}
          />
          <DataDisplay
            title='Pinta-ala'
            value={property.yardArea + 'm2' || 'Ei määritelty'}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h1>Lämmitys</h1>
          {heatingBatch.map(hb => {
            const ht = refs.heatingTypes.find(t => t.id == hb.value.heating_type_id)?.name;
            return (
              <DataDisplay
                title={ht}
                value={hb.value.is_primary && <span>Ensisijainen</span>}
              />
            );
          })}
        </div>
        <div className='flex flex-col gap-2'>
          <h1>Muut tiedot</h1>
          <DataDisplay
            title='Autotalli'
            value={property.hasGarage ? 'Kyllä' : 'Ei'}
          />
        </div>
      </div>
    </BoxFieldset>
  );
}
