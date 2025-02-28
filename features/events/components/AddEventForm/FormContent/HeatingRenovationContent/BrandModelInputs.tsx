import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';

export const BrandAndModelInputs = ({
  brandLabel,
  modelLabel,
  brandPlaceholder,
  modelPlaceholder,
}) => {
  const { eventData, updateEventData, payload, updatePayload } = useEventFormContext();

  return (
    <>
      <FormControl
        label={brandLabel}
        control={
          <Input
            name='heating_center_brand'
            onChange={updatePayload}
            value={(payload as any).heating_center_brand || ''}
            placeholder={brandPlaceholder}
          />
        }
      />

      <FormControl
        helper='Mallin ja merkin tallentaminen auttaa tulevaisuudessa laitteen yksityiskohtaisten tietojen selvittämisessä.'
        label={modelLabel}
        control={
          <Input
            name='heating_center_model'
            placeholder={modelPlaceholder}
            onChange={updatePayload}
            value={(payload as any).heating_center_model || ''}
          />
        }
      />
    </>
  );
};
