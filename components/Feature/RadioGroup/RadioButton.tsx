import { Spacer } from '@/components/UI/Spacer';

/**Renders a regular round radio-button, with a label. */
export function RadioButton({
  name,
  value,
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) {
  return (
    <Spacer gap={'medium'}>
      <input
        name={name}
        value={value}
        {...props}
        type='radio'
      />
      <label>{label}</label>
    </Spacer>
  );
}
