import { FormControl, NullOption } from '@/components/UI/FormUtils';

export const LockEventContent = () => (
  <>
    <FormControl
      boldLabelText
      required
      label='Tyyppi'
      control={
        <select name='lockTypeId'>
          <NullOption>Valitse lukon tyyppi...</NullOption>
        </select>
      }
    />
  </>
);
