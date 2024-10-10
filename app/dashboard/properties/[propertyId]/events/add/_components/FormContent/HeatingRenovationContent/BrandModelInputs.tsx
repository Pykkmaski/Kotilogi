import { FormControl, Input } from '@/components/UI/FormUtils';

export const BrandAndModelInputs = ({
  brandLabel,
  modelLabel,
  brandPlaceholder,
  modelPlaceholder,
}) => {
  return (
    <>
      <FormControl
        label={brandLabel}
        control={
          <Input
            name='brand'
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
          />
        }
      />
    </>
  );
};
