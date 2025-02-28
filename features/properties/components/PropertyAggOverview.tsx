'use client';

import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { usePropertyFormContext } from './PropertyFormContext';
import { DataDisplay } from '@/components/UI/DataDisplay';
import { PropertyPayloadType } from '../types/PropertyPayloadType';
import { Notification } from '@/components/UI/Notification';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { BooleanIcon } from '@/components/UI/BooleanIcon';

const InfoContainer = ({ children }) => <div className='flex flex-col gap-2'>{children}</div>;
const Title = ({ children }) => <h1 className='font-semibold'>{children}</h1>;

export function PropertyAggOverview() {
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
              refs.buildingTypes.find(mat => mat.id == property.building?.building_type_id)?.name ||
              'Ei määritelty'
            }
          />
          <DataDisplay
            title='Rakennusmateriaali'
            value={
              refs.buildingMaterials.find(mat => mat.id == property.building?.building_material_id)
                ?.name || 'Ei määritelty'
            }
          />

          <DataDisplay
            title='Julkisivun väri'
            value={
              refs.mainColors.find(mat => mat.id == property.building?.color_id)?.name ||
              'Ei määritelty'
            }
          />
        </InfoContainer>

        {isNew && (
          <InfoContainer>
            <Title>Katto</Title>
            <DataDisplay
              title='Tyyppi'
              value={property.roof?.roof_type || 'Ei määritelty'}
            />
            <DataDisplay
              title='Materiaali'
              value={property.roof?.roof_material || 'Ei määritelty'}
            />
            <DataDisplay
              title='Räystästyyppi'
              value={property.roof?.eaves_type || 'Ei määritelty'}
            />
            <DataDisplay
              title='Aluskatetyyppi'
              value={property.roof?.underlacing_type || 'Ei määritelty'}
            />
            <DataDisplay
              title='Väri'
              value={property.roof?.color || 'Ei määritelty'}
            />
            <DataDisplay
              title='Kaltevuus'
              value={property.roof?.incline}
            />
            <DataDisplay
              title='Neliömetrit'
              value={property.roof?.area}
            />
            <DataDisplay
              title='Piipunpellitys'
              value={<BooleanIcon state={property.roof?.has_chimney_plating as boolean} />}
            />
            <DataDisplay
              title='Kattosilta'
              value={<BooleanIcon state={property.roof?.has_roof_bridge as boolean} />}
            />
            <DataDisplay
              title='Kourut'
              value={<BooleanIcon state={property.roof?.has_gutters as boolean} />}
            />
            <DataDisplay
              title='Syöksysarja'
              value={<BooleanIcon state={property.roof?.has_downspout_system as boolean} />}
            />
            <DataDisplay
              title='Lapetikas'
              value={<BooleanIcon state={property.roof?.lapetikas as boolean} />}
            />
            <DataDisplay
              title='Turvatikas'
              value={<BooleanIcon state={property.roof?.has_security_ladder as boolean} />}
            />
            <DataDisplay
              title='Seinätikas'
              value={<BooleanIcon state={property.roof?.has_ladder as boolean} />}
            />
            <DataDisplay
              title='Harjatuuletus aluskatteella'
              value={<BooleanIcon state={property.roof?.has_underlacing_ventilation as boolean} />}
            />
            <DataDisplay
              title='Lumieste'
              value={<BooleanIcon state={property.roof?.has_snow_barrier as boolean} />}
            />
          </InfoContainer>
        )}

        <InfoContainer>
          <Title>Sisätilat</Title>
          <DataDisplay
            title='Kerrosten lukumäärä'
            value={property.interior?.floor_count || 'Ei määritelty'}
          />
          <DataDisplay
            title='Huoneiden lukumäärä'
            value={property.interior?.room_count || 'Ei määritelty'}
          />

          <DataDisplay
            title='Vessojen lukumäärä'
            value={property.interior?.bathroom_count || 'Ei määritelty'}
          />

          <DataDisplay
            title={
              <>
                Asuintilojen pinta-ala <sup>m2</sup>
              </>
            }
            value={property.interior?.living_area || 'Ei määritelty'}
          />

          <DataDisplay
            title={
              <>
                Muu pinta-ala <sup>m2</sup>
              </>
            }
            value={property.interior?.other_area || 'Ei määritelty'}
          />

          <DataDisplay
            title={
              <>
                Pinta-ala- yhteensä <sup>m2</sup>
              </>
            }
            value={
              property.interior?.living_area + property.interior?.other_area || 'Ei määritelty'
            }
          />
        </InfoContainer>

        <InfoContainer>
          <Title>Tontti</Title>

          <DataDisplay
            title='Omistus'
            value={
              refs.yardOwnershipTypes.find(t => t.id == property.yard?.yardOwnershipTypeId)?.name ||
              'Ei määritelty'
            }
          />
          <DataDisplay
            title={
              <>
                Pinta-ala<sup>m2</sup>
              </>
            }
            value={property.yard?.yardArea || 'Ei määritelty'}
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
