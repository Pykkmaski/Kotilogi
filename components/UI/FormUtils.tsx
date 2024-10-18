import React from 'react';
import { SublabelText } from './Text';
import { PassProps } from '../Util/PassProps';

type LabelProps = React.ComponentProps<'label'> & {
  required?: boolean;
  boldText?: boolean;
};
export const Label = ({ children, required, boldText }: LabelProps) => {
  const classes = [boldText ? 'font-medium' : 'font-normal'];
  return (
    <label className={classes.join(' ')}>
      {children}
      {required ? <span className='text-red-700 text-sm'> *</span> : null}
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
  | ({
      variant?: 'select';
    } & React.ComponentProps<'select'>)
) & { icon?: React.ReactElement };

export const Input = ({ icon, children, variant = 'input', ...props }: InputProps) => {
  //const baseInputClasses = ['p-4 shadow-md bg-white rounded-md  text-lg w-full', className];

  const getInput = props => {
    if (variant === 'input') {
      return <input {...props} />;
    } else if (variant == 'textarea') {
      return <textarea {...props} />;
    } else {
      return <select {...props}>{children}</select>;
    }
  };

  return (
    <div className='relative flex w-full items-center'>
      {getInput({ className: 'w-full', ...props })}
      <div className='absolute right-2'>{icon}</div>
    </div>
  );
};

export const Checkbox = (props: React.ComponentProps<'input'>) => {
  return (
    <input
      {...props}
      type='checkbox'
      className='aspect-square w-5'
    />
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

export type FormControlProps = React.ComponentProps<'div'> & {
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
      className={[props.className ? props.className.split(' ') : '' + 'flex flex-col gap-2'].join(
        ' '
      )}>
      <Label
        boldText={boldLabelText}
        required={required}>
        {label}
      </Label>
      <PassProps required={required}>{control}</PassProps>

      <SubLabel>{helper}</SubLabel>
    </div>
  );
};

type CheckboxLabelProps = {
  label: string;
  control: JSX.Element;
};

export const CheckboxLabel = ({ label, control }: CheckboxLabelProps) => {
  return (
    <div className='flex flex-row gap-4'>
      {control}
      {label}
    </div>
  );
};

export const RadioGroupContainer = ({ children }) => (
  <div className='flex flex-col gap-2'>{children}</div>
);

export const NullOption = ({ children, disabled = true }) => (
  <option
    value='null'
    disabled={disabled}
    selected>
    {children}
  </option>
);
