export function ErrorText({ children, ...props }) {
  return (
    <span
      className='text-red-600 text-[16px]'
      {...props}>
      {children}
    </span>
  );
}

export function SuccessText({ children, ...props }) {
  return (
    <span
      className='text-green-400 text-[16px]'
      {...props}>
      {children}
    </span>
  );
}

export function SublabelText({ children, ...props }) {
  return (
    <span
      className='text-sm'
      {...props}>
      {children}
    </span>
  );
}
