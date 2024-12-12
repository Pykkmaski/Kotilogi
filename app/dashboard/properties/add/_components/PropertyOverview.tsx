'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import { usePropertyFormContext } from './PropertyFormContext';
import { DataDisplay } from '@/components/UI/DataDisplay';
import { Check, Clear } from '@mui/icons-material';
import { ToggleProvider } from '@/components/Util/ToggleProvider';
import { Button } from '@/components/New/Button';
import { VPDialog } from '@/components/UI/VPDialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { PropertyPayloadType } from 'kotilogi-app/dataAccess/types';

export function PropertyOverview() {
  const { property: prop, heatingBatch, refs, isValid } = usePropertyFormContext();
  const property = prop || {};

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
            value={refs.propertyTypes.find(t => t.id == property.propertyTypeId)?.name}
          />
          <DataDisplay
            title='Katuosoite'
            value={property.streetAddress}
          />

          <DataDisplay
            title='Talon numero'
            value={property.houseNumber}
          />

          <div className='flex gap-2 items-center text-slate-500'>
            {isValid ? (
              <>
                <span>Kiinteistö on vahvistettu</span>
                <Check
                  sx={{ fontSize: '1rem' }}
                  className='text-green-600'
                />
              </>
            ) : (
              <>
                <span>Kiinteistö on virheellinen!</span>
                <Clear
                  sx={{ fontSize: '1rem' }}
                  className='text-red-600'
                />
              </>
            )}
          </div>
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
          {heatingBatch.map(hb => {
            const ht = refs.heatingTypes.find(t => t.id == hb.value.heating_type_id)?.name;
            return (
              <DataDisplay
                title={ht}
                value={hb.value.is_primary ? <span>Ensisijainen</span> : ' '}
              />
            );
          })}
        </div>
        <div className='flex flex-col gap-2'>
          <h1>Muut tiedot</h1>
          <DataDisplay
            title='Autotalli'
            value={(property.hasGarage as any) == 'on' ? 'Kyllä' : 'Ei'}
          />
        </div>
      </div>
    </BoxFieldset>
  );
}
