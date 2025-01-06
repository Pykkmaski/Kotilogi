const containerClassName = 'w-full bg-[#202221] px-5 py-4 rounded-md border-none text-white';

/**Renders an input to be used in the new forms. */
export function WFAuthInput(props: React.ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={containerClassName}
    />
  );
}

export function WFAuthTextArea(props: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      {...props}
      className={['min-h-[10.5rem]', containerClassName].join(' ')}
    />
  );
}
