import { Input } from '../UI/FormUtils';

export const DateInput = (props: React.ComponentProps<typeof Input>) => {
  return (
    <Input
      {...props}
      type='date'
    />
  );
};
