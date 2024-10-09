import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl, Input, Label } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useQuery } from '@tanstack/react-query';
import { getAluskatetyypit, getColors, getOtsalautatyypit, getRaystastyypit } from './actions';
import Spinner from '@/components/UI/Spinner';
import { useEventFormContext } from '../EventFormContext';
import { Checkbox } from '@/components/Feature/RadioGroup/Checkbox';
import { RoofDataType } from 'kotilogi-app/dataAccess/types';

export const RoofEventContent = () => {
  const { refs } = useEventTypeContext();
  const { extraData } = useEventFormContext() as { extraData: Partial<RoofDataType> };
  const { data: raystastyypit, isLoading: isRaystasLoading } = useQuery({
    queryKey: ['raystastyypit'],
    queryFn: async () => await getRaystastyypit(),
  });

  const { data: otsalautatyypit, isLoading: isOtsalaudatLoading } = useQuery({
    queryKey: ['otsalautatyypit'],
    queryFn: async () => await getOtsalautatyypit(),
  });

  const { data: aluskatetyypit, isLoading: isAluskatteetLoading } = useQuery({
    queryKey: ['aluskatetyypit'],
    queryFn: async () => await getAluskatetyypit(),
  });

  const { data: colors, isLoading: isColorsLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await getColors(),
  });

  return (
    <>
      <div className='flex flex-col gap-2'>
        <Label
          boldText
          required>
          Materiaali
        </Label>
        <RadioGroup name='roofMaterialId'>
          {refs.roofMaterials.map(type => (
            <ChipButton
              required
              label={type.name}
              value={type.id}
              checked={extraData && extraData.roofMaterialId == type.id}
            />
          ))}
        </RadioGroup>
      </div>

      <div className='flex flex-col gap-2'>
        <Label
          boldText
          required>
          Tyyppi
        </Label>
        <RadioGroup name='roofTypeId'>
          {refs.roofTypes.map(type => (
            <ChipButton
              required
              label={type.name}
              value={type.id}
              checked={extraData && extraData.roofTypeId == type.id}
            />
          ))}
        </RadioGroup>
      </div>

      <FormControl
        label='Väri'
        control={
          <RadioGroup name='colorId'>
            {isColorsLoading ? (
              <Spinner
                size='1rem'
                message='Ladataan värejä...'
              />
            ) : (
              colors.map(t => (
                <ChipButton
                  label={t.name}
                  value={t.id}
                  checked={extraData && extraData.colorId == t.id}
                />
              ))
            )}
          </RadioGroup>
        }
      />

      <FormControl
        label='Räystästyyppi'
        control={
          <RadioGroup name='raystasTyyppiId'>
            {isRaystasLoading ? (
              <Spinner
                size='1rem'
                message='Ladataan räystästyyppejä...'
              />
            ) : (
              raystastyypit.map(t => (
                <ChipButton
                  label={t.label}
                  value={t.id}
                  checked={extraData.raystasTyyppiId == t.id}
                />
              ))
            )}
          </RadioGroup>
        }
      />

      <FormControl
        label='Otsalaudat'
        control={
          <RadioGroup name='otsalautaTyyppiId'>
            {isOtsalaudatLoading ? (
              <Spinner
                size='1rem'
                message='Ladataan otsalautatyyppejä...'
              />
            ) : (
              otsalautatyypit.map(t => (
                <ChipButton
                  label={t.label}
                  value={t.id}
                  checked={extraData.otsalautaTyyppiId == t.id}
                />
              ))
            )}
          </RadioGroup>
        }
      />

      <FormControl
        label='Aluskate'
        control={
          <RadioGroup name='aluskateTyyppiId'>
            {isAluskatteetLoading ? (
              <Spinner
                size='1rem'
                message='Ladataan aluskateTyyppejä...'
              />
            ) : (
              aluskatetyypit.map(t => (
                <ChipButton
                  label={t.label}
                  value={t.id}
                  checked={extraData && extraData.aluskateTyyppiId == t.id}
                />
              ))
            )}
          </RadioGroup>
        }
      />

      <FormControl
        label={<>Katon kaltevuus</>}
        control={
          <Input
            name='kaltevuus'
            placeholder='Anna katon kaltevuus...'
            value={extraData && extraData.kaltevuus}
          />
        }
      />

      <FormControl
        label={<>Katto neliömetreinä</>}
        control={
          <Input
            name='neliometrit'
            type='number'
            placeholder='Anna katon kaltevuus...'
            value={extraData && extraData.neliometrit}
          />
        }
      />

      <Checkbox
        label='Harjatuuletus aluskatteella'
        name='harjatuuletusAluskatteella'
        checked={extraData && extraData.harjatuuletusAluskatteella}
      />

      <Checkbox
        label='Suojakäsitelty puutavara'
        name='suojakasiteltyPuutavara'
        checked={extraData && extraData.suojakasiteltyPuutavara}
      />

      <Checkbox
        label='Piipunpellitys'
        name='piipunpellitys'
        checked={extraData && extraData.piipunpellitys}
      />

      <Checkbox
        label='Seinätikas'
        name='seinatikas'
        checked={extraData && extraData.seinatikas}
      />

      <Checkbox
        label='Lapetikas'
        name='lapetikas'
        checked={extraData && extraData.lapetikas}
      />

      <Checkbox
        label='Lumieste'
        name='lumieste'
        checked={extraData && extraData.lumieste}
      />

      <Checkbox
        label='Kattosilta'
        name='kattosilta'
        checked={extraData && extraData.kattosilta}
      />

      <Checkbox
        label='Turvatikas'
        name='turvatikas'
        checked={extraData && extraData.turvatikas}
      />

      <Checkbox
        label='Kourut'
        name='kourut'
        checked={extraData && extraData.kourut}
      />

      <Checkbox
        label='Syöksysarja'
        name='syoksysarja'
        checked={extraData && extraData.syoksysarja}
      />
    </>
  );
};
