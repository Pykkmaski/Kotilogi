export function ErrorText({ children, ...props }) {
  return (
    <span className='text-red-600'>
      <SublabelText {...props}>{children}</SublabelText>
    </span>
  );
}

export function SuccessText({ children, ...props }) {
  return (
    <span className='text-green-400'>
      <SublabelText {...props}>{children}</SublabelText>
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
