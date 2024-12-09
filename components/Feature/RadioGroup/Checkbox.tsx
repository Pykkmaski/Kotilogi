/**Renders a regular round radio-button, with a label. */
export function Checkbox({
  name,
  value,
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) {
  return (
    <div className='flex flex-row gap-4 items-center'>
      <input
        name={name}
        value={value}
        {...props}
        type='checkbox'
      />
      <span>{label}</span>
    </div>
  );
}
