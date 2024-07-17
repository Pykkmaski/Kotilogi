'use client';

import { updateProperty } from '@/actions/experimental/properties';
import { AUpdateProperty } from '@/actions/properties';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import {
  Checkbox,
  CheckboxLabel,
  FormControl,
  Group,
  Input,
  Label,
} from '@/components/UI/FormUtils';
import { SideBySide } from '@/components/UI/SideBySide';
import { useInputData } from '@/hooks/useInputData';
import {
  buildingMaterials,
  buildingTypes,
  colors,
  energyClasses,
  roofMaterials,
  roofTypes,
  yardOwnershipTypes,
} from 'kotilogi-app/constants';
import { getTranslation } from 'kotilogi-app/lang';
import { BuildingMaterial } from 'kotilogi-app/models/enums/BuildingMaterial';
import { BuildingType } from 'kotilogi-app/models/enums/BuildingType';
import { Color } from 'kotilogi-app/models/enums/Color';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { RoofMaterial } from 'kotilogi-app/models/enums/RoofMaterial';
import { RoofType } from 'kotilogi-app/models/enums/RoofType';
import { YardOwnershipType } from 'kotilogi-app/models/enums/YardOwnershipType';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/models/types';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

type PropertyFormProps = {
  property: HouseDataType | AppartmentDataType;
};

export function PropertyForm({ property }: PropertyFormProps) {
  const { data, updateData, resetData } = useInputData(property);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current === false) {
      const timeout = setTimeout(async () => {
        AUpdateProperty(data).catch(err => toast.error(err.message));
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      firstRender.current = false;
    }
  }, [data]);

  console.log(typeof property.livingArea);
  return (
    <form
      onChange={updateData}
      className='flex flex-col gap-4'>
      <Fieldset legend='Yleistiedot'>
        <div className='w-full gap-2 flex items-center'>
          <FormControl
            className='w-full'
            required
            label='Osoite'
            control={
              <Input
                name='title'
                defaultValue={property.streetAddress}
              />
            }
          />

          <FormControl
            required
            label='Postinumero'
            control={
              <Input
                name='zipCode'
                defaultValue={property.zipCode}
              />
            }
          />
        </div>

        {property.propertyType == PropertyType.HOUSE ? (
          <FormControl
            className='w-full'
            label='Kiinteistötunnus'
            control={
              <Input
                name='propertyNumber'
                defaultValue={property.propertyNumber}
              />
            }
          />
        ) : property.propertyType === PropertyType.APT ? (
          <FormControl
            label='Huoneiston numero'
            control={
              <Input
                name='appartmentNumber'
                defaultValue={property.appartmentNumber}
              />
            }
          />
        ) : null}

        <FormControl
          label='Rakennusvuosi'
          control={
            <Input
              name='buildYear'
              defaultValue={property.buildYear}
            />
          }
        />

        <SideBySide>
          <Group>
            <Label boldText>Talotyyppi</Label>
            <RadioGroup groupName='buildingType'>
              {getEnumAsDigits(BuildingType).map(type => (
                <RadioButton
                  label={getTranslation('buildingType', type)}
                  type='radio'
                  value={type}
                  defaultChecked={property.buildingType == type}
                />
              ))}
            </RadioGroup>
          </Group>

          <Group>
            <Label boldText>Energialuokka</Label>
            <RadioGroup groupName='energyClass'>
              {energyClasses.map(c => (
                <RadioButton
                  label={c}
                  type='radio'
                  value={c}
                  defaultChecked={property.energyClass === c}
                />
              ))}
            </RadioGroup>
          </Group>
        </SideBySide>
      </Fieldset>

      <Fieldset legend='Ulkopuoli'>
        <SideBySide>
          <Group>
            <Label boldText>Väri</Label>
            <RadioGroup groupName='color'>
              {getEnumAsDigits(Color).map(color => (
                <RadioButton
                  label={getTranslation('color', color)}
                  type='radio'
                  value={color}
                  defaultChecked={property.color == color}
                />
              ))}
            </RadioGroup>
          </Group>

          <Group>
            <Label boldText>Rakennusmateriaali</Label>
            <RadioGroup groupName='buildingMaterial'>
              {getEnumAsDigits(BuildingMaterial).map(mat => (
                <RadioButton
                  label={getTranslation('buildingMaterial', mat)}
                  type='radio'
                  value={mat}
                  defaultChecked={property.buildingMaterial == mat}
                />
              ))}
            </RadioGroup>
          </Group>
        </SideBySide>

        <SideBySide>
          <Group>
            <Label boldText>Katon tyyppi</Label>
            <RadioGroup groupName='roofType'>
              {getEnumAsDigits(RoofType).map(type => (
                <RadioButton
                  label={getTranslation('roofType', type)}
                  type='radio'
                  value={type}
                  defaultChecked={property.roofType == type}
                />
              ))}
            </RadioGroup>
          </Group>

          <Group>
            <Label boldText>Katon materiaali</Label>
            <RadioGroup groupName='roofMaterial'>
              {getEnumAsDigits(RoofMaterial).map(type => (
                <RadioButton
                  label={getTranslation('roofMaterial', type)}
                  type='radio'
                  value={type}
                  defaultChecked={property.roofMaterial == type}
                />
              ))}
            </RadioGroup>
          </Group>
        </SideBySide>
      </Fieldset>

      <Fieldset legend='Sisätilat'>
        <FormControl
          label={
            <>
              Pinta-ala <sup className='text-super'>m2</sup>
            </>
          }
          control={
            <Input
              name='livingArea'
              type='number'
              step={0.1}
              defaultValue={property.livingArea / 100}
            />
          }
        />

        <FormControl
          label={
            <>
              Muut tilat <sup className='text-super'>m2</sup>
            </>
          }
          control={
            <Input
              name='otherArea'
              type='number'
              step={0.1}
              defaultValue={property.otherArea / 100}
            />
          }
        />

        <FormControl
          label='Huoneiden lukumäärä'
          control={
            <Input
              name='roomCount'
              type='number'
              defaultValue={property.roomCount}
            />
          }
        />

        <FormControl
          label={property.buildingType == BuildingType.APT ? 'Kerros' : 'Kerrosten lukumäärä'}
          control={
            <Input
              name='floorCount'
              type='number'
              defaultValue={property.floorCount}
            />
          }
        />

        <FormControl
          label='Vessojen lukumäärä'
          control={
            <Input
              name='wcCount'
              type='number'
              defaultValue={property.wcCount}
            />
          }
        />
      </Fieldset>

      {property.propertyType == PropertyType.HOUSE ? (
        <Fieldset legend='Tontti'>
          <Group>
            <Label boldText>Tontin omistus</Label>
            <RadioGroup groupName='yardOwnership'>
              {getEnumAsDigits(YardOwnershipType).map(type => (
                <RadioButton
                  label={getTranslation('yardOwnershipType', type)}
                  type='radio'
                  value={type}
                  defaultChecked={type === property.yardOwnershipType}
                />
              ))}
            </RadioGroup>
          </Group>

          {property.yardOwnershipType !== YardOwnershipType.NONE ? (
            <FormControl
              label={
                <>
                  Pinta-ala <sup className='text-super'>m2</sup>
                </>
              }
              control={
                <Input
                  name='yardArea'
                  type='number'
                  min='1'
                  defaultValue={property.yardArea / 100}
                />
              }
            />
          ) : null}
        </Fieldset>
      ) : null}

      <Fieldset legend='Muut tiedot'>
        <CheckboxLabel
          label='Autotalli'
          control={
            <Checkbox
              name='hasGarage'
              defaultChecked={property.hasGarage}
            />
          }
        />

        {property.propertyType === PropertyType.APT ? (
          <CheckboxLabel
            label='Parveke'
            control={
              <Checkbox
                name='hasBalcony'
                defaultChecked={property.hasBalcony}
              />
            }
          />
        ) : null}
      </Fieldset>
    </form>
  );
}
