import React from 'react';
import { SublabelText } from './Text';

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

type InputProps = (
  | ({
      variant?: 'input';
    } & React.ComponentProps<'input'>)
  | ({
      variant?: 'textarea';
    } & React.ComponentProps<'textarea'>)
) & { icon?: React.ReactElement };

export const Input = ({ icon, children, variant = 'input', ...props }: InputProps) => {
  const getInput = props => {
    if (variant === 'input') {
      return <input {...props} />;
    } else {
      return <textarea {...props} />;
    }
  };

  return (
    <div className='relative flex w-full items-center'>
      {getInput({ className: 'w-full', ...props })}
      <div className='absolute right-2'>{icon}</div>
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
      <SublabelText>{helper}</SublabelText>
    </div>
  );
};

type FormControlLabel = {
  label: string;
  control: React.ReactElement<React.ComponentProps<'input'>>;
  required?: boolean;
};

export const FormControlLabel = ({ label, control, required = false }: FormControlLabel) => {
  return (
    <div className='flex gap-4 items-center'>
      {label}
      {React.cloneElement(control, {
        ...control.props,
        required,
      })}
    </div>
  );
};
