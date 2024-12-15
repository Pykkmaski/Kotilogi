import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';
import { Checkbox } from '@/components/Feature/RadioGroup/Checkbox';
import { RoofDataType } from 'kotilogi-app/dataAccess/types';
import { OtsalautaSelector } from './OtsalautaSelector';
import { ColorSelector } from './ColorSelector';
import { RoofMaterialSelector } from './RoofMaterialSelector';
import { RoofTypeSelector } from './RoofTypeSelector';
import { RaystasSelector } from './RaystasSelector';
import { AluskateSelector } from './AluskateSelector';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { getContent } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/actions';

export const RoofEventContent = () => {
  const { extraData, eventData } = useEventFormContext();

  const { data: existingRoof, isLoading } = useQuery({
    queryKey: [`roof-${eventData.property_id}`],
    queryFn: async () => await getContent('roofs.overview', { property_id: eventData.property_id }),
  });

  return (
    <div className='flex flex-col gap-4'>
      <RoofMaterialSelector />
      <RoofTypeSelector />
      <ColorSelector />
      <RaystasSelector />
      <OtsalautaSelector />
      <AluskateSelector />

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
            placeholder='Anna katto neliömetreinä...'
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
    </div>
  );
};
