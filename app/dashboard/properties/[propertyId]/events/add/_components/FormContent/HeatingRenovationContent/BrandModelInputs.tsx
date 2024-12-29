import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';

export const BrandAndModelInputs = ({
  brandLabel,
  modelLabel,
  brandPlaceholder,
  modelPlaceholder,
}) => {
  const { eventData, updateEventData } = useEventFormContext();

  return (
    <>
      <FormControl
        label='Nimi'
        control={
          <Input
            name='name'
            placeholder='Anna lämmitykselle nimi...'
            onChange={updateEventData}
            value={(eventData as any).name}
          />
        }
      />
      <FormControl
        label={brandLabel}
        control={
          <Input
            name='brand'
            onChange={updateEventData}
            value={(eventData as any).brand}
            placeholder={brandPlaceholder}
          />
        }
      />

      <FormControl
        helper='Mallin ja merkin tallentaminen auttaa tulevaisuudessa laitteen yksityiskohtaisten tietojen selvittämisessä.'
        label={modelLabel}
        control={
          <Input
            name='model'
            placeholder={modelPlaceholder}
            onChange={updateEventData}
            value={(eventData as any).model}
          />
        }
      />
    </>
  );
};
