import React from 'react';

type LabelProps = React.ComponentProps<'label'> & {
  required?: boolean;
  boldText?: boolean;
};
export const Label = ({ children, required, boldText }: LabelProps) => {
  return (
    <label
      className={`
      ${boldText ? 'font-semibold' : 'font-normal'}
    `}>
      {children}
      {required ? <span className='text-red-700 text-sm'> Pakollinen</span> : null}
    </label>
  );
};

export const Group = ({ children }: React.PropsWithChildren) => {
  return <div className='flex flex-col gap-1'>{children}</div>;
};

export const Input = ({
  children,
  ...props
}: React.ComponentProps<'input'> & React.PropsWithChildren) => {
  return (
    <div className='relative flex w-full items-center'>
      <input
        {...props}
        className='w-full'
      />
      <div className='absolute right-2'>{children}</div>
    </div>
  );
};

export const SubLabel = ({ children }: React.PropsWithChildren) => {
  return <div className='text-sm w-full text-left text-slate-500'>{children}</div>;
};

export const Description = ({ children }: React.PropsWithChildren) => {
  return (
    <SubLabel>
      <div className='text-slate-500'>{children}</div>
    </SubLabel>
  );
};

export const ErrorMessage = ({ children, ...props }: React.PropsWithChildren) => {
  return (
    <SubLabel>
      <div
        className='text-red-500'
        {...props}>
        {children}
      </div>
    </SubLabel>
  );
};

type FormControlProps = React.ComponentProps<'div'> & {
  control: React.ReactNode;
  label: React.ReactNode;
  helper?: React.ReactNode;
  required?: boolean;
  boldLabelText?: boolean;
};

export const FormControl = ({
  control,
  label,
  helper,
  boldLabelText = false,
  required = false,
  ...props
}: FormControlProps) => {
  return (
    <div
      className={[props.className ? props.className.split(' ') : '' + 'flex flex-col'].join(' ')}>
      <Label
        boldText={boldLabelText}
        required={required}>
        {label}
      </Label>
      {React.cloneElement(control as React.ReactElement, {
        ...(control as React.ReactElement).props,
        required: required,
      })}
      {helper}
    </div>
  );
};
