'use client';

import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { usePropertyFormContext } from './PropertyFormContext';
import { DataDisplay } from '@/components/UI/DataDisplay';
import { Check, Clear, Square, SquareOutlined } from '@mui/icons-material';
import { PropertyPayloadType } from 'kotilogi-app/dataAccess/types';
import { Notification } from '@/components/UI/Notification';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { green } from 'tailwindcss/colors';

const InfoContainer = ({ children }) => <div className='flex flex-col gap-2'>{children}</div>;
const Title = ({ children }) => <h1 className='font-semibold'>{children}</h1>;
const BooleanIcon = ({ state }: { state: boolean }) =>
  (state && <Check sx={{ color: green['400'] }} />) || <SquareOutlined />;

export function PropertyOverview() {
  const { property: prop, refs, isValid, selectedHeating, isNew } = usePropertyFormContext();
  const property = prop || ({} as PropertyPayloadType);

  return (
    <BoxFieldset legend='Yhteenveto'>
      <div className='flex flex-col gap-8 lg:w-[50%] xs:w-full'>
        <InfoContainer>
          <Title>Yleistiedot</Title>

          <DataDisplay
            title='Kiinteistötunnus'
            value={(property as TODO).propertyNumber || 'Ei määritelty'}
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

          <DataDisplay
            title='Energialuokka'
            value={refs.energyClasses.find(c => c.id == property.energy_class_id)?.name}
          />

          <DataDisplay
            title='Energialuokituksen vuosi'
            value={property.energy_class_year}
          />

          {!isValid ? (
            <CarouselProvider.SelectSlotTrigger slotToSelect='general'>
              <Notification
                variant='error'
                position='start'
                title='Siirry yleistietoihin klikkaamalla...'>
                Kiinteistötunnus on virheellinen!
              </Notification>
            </CarouselProvider.SelectSlotTrigger>
          ) : typeof property.street_number == 'undefined' ? (
            <CarouselProvider.SelectSlotTrigger slotToSelect='general'>
              <Notification
                position='start'
                variant='error'
                title='Siirry yleistietoihin klikkaamalla...'>
                Talon numero puuttuu!
              </Notification>
            </CarouselProvider.SelectSlotTrigger>
          ) : null}
        </InfoContainer>

        <InfoContainer>
          <Title>Ulkopuoli</Title>
          <DataDisplay
            title='Rakennuksen tyyppi'
            value={
              refs.buildingTypes.find(mat => mat.id == property.building_type_id)?.name ||
              'Ei määritelty'
            }
          />
          <DataDisplay
            title='Rakennusmateriaali'
            value={
              refs.buildingMaterials.find(mat => mat.id == property.building_material_id)?.name ||
              'Ei määritelty'
            }
          />

          <DataDisplay
            title='Julkisivun väri'
            value={
              refs.mainColors.find(mat => mat.id == property.color_id)?.name || 'Ei määritelty'
            }
          />
        </InfoContainer>

        {isNew && (
          <InfoContainer>
            <Title>Katto</Title>
            <DataDisplay
              title='Tyyppi'
              value={property.roof_type || 'Ei määritelty'}
            />
            <DataDisplay
              title='Materiaali'
              value={property.roof_material || 'Ei määritelty'}
            />
            <DataDisplay
              title='Räystästyyppi'
              value={property.eaves_type || 'Ei määritelty'}
            />
            <DataDisplay
              title='Aluskatetyyppi'
              value={property.underlacing_type || 'Ei määritelty'}
            />
            <DataDisplay
              title='Väri'
              value={property.color || 'Ei määritelty'}
            />
            <DataDisplay
              title='Kaltevuus'
              value={property.incline}
            />
            <DataDisplay
              title='Neliömetrit'
              value={property.area}
            />
            <DataDisplay
              title='Piipunpellitys'
              value={<BooleanIcon state={property.has_chimney_plating} />}
            />
            <DataDisplay
              title='Kattosilta'
              value={<BooleanIcon state={property.has_roof_bridge} />}
            />
            <DataDisplay
              title='Kourut'
              value={<BooleanIcon state={property.has_gutters} />}
            />
            <DataDisplay
              title='Syöksysarja'
              value={<BooleanIcon state={property.has_downspout_system} />}
            />
            <DataDisplay
              title='Lapetikas'
              value={<BooleanIcon state={property.lapetikas} />}
            />
            <DataDisplay
              title='Turvatikas'
              value={<BooleanIcon state={property.has_security_ladder} />}
            />
            <DataDisplay
              title='Seinätikas'
              value={<BooleanIcon state={property.has_ladder} />}
            />
            <DataDisplay
              title='Harjatuuletus aluskatteella'
              value={<BooleanIcon state={property.has_underlacing_ventilation} />}
            />
            <DataDisplay
              title='Lumieste'
              value={<BooleanIcon state={property.has_snow_barrier} />}
            />
          </InfoContainer>
        )}

        <InfoContainer>
          <Title>Sisätilat</Title>

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
        </InfoContainer>

        <InfoContainer>
          <Title>Tontti</Title>

          <DataDisplay
            title='Omistus'
            value={
              refs.yardOwnershipTypes.find(t => t.id == property.yardOwnershipTypeId)?.name ||
              'Ei määritelty'
            }
          />
          <DataDisplay
            title={
              <>
                Pinta-ala<sup>m2</sup>
              </>
            }
            value={property.yardArea || 'Ei määritelty'}
          />
        </InfoContainer>

        {isNew && (
          <InfoContainer>
            <Title>Lämmitys</Title>

            {selectedHeating.length ? (
              <DataDisplay
                title={'Lämmitysmuodot'}
                value={selectedHeating.join(', ')}
              />
            ) : (
              <span className='font-semibold'>Ei lisättyjä lämmitysmuotoja.</span>
            )}
          </InfoContainer>
        )}

        <InfoContainer>
          <Title>Muut tiedot</Title>

          <DataDisplay
            title='Autotalli'
            value={<BooleanIcon state={property.has_garage} />}
          />
        </InfoContainer>
      </div>
    </BoxFieldset>
  );
}
