/**Renders a regular round radio-button, with a label. */
export function Checkbox({
  name,
  checked,
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) {
  return (
    <div className='flex flex-row gap-4 items-center'>
      <input
        {...props}
        name={name}
        type='checkbox'
        checked={checked}
      />
      <span>{label}</span>
    </div>
  );
}
