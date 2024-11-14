import { Check } from '@mui/icons-material';
import { TextEllipsis } from './TextEllipsis';

export function FalseInputLabel({ children }: React.PropsWithChildren) {
  return <label className='pl-2 text-slate-500'>{children}</label>;
}

export function FalseInputFieldBody({ children }: React.PropsWithChildren) {
  return <div className='rounded-md bg-slate-100 p-2 w-full'>{children}</div>;
}

export function FalseInputCheckboxBody({ children }: React.PropsWithChildren) {
  return (
    <span className='p-2 bg-slate-100 rounded-md relative flex items-center justify-center aspect-square w-8'>
      {children}
    </span>
  );
}

type FalseInputProps<
  VariantT extends 'checkbox' | 'field',
  T = VariantT extends 'checkbox' ? boolean : number | string
> = {
  label: string;
  value: T | undefined;
  variant: VariantT;
};

export function FalseInput<
  VariantT extends 'checkbox' | 'field',
  T = VariantT extends 'checkbox' ? boolean : number | string
>({ label, value, variant }: FalseInputProps<VariantT, T>) {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <FalseInputLabel>{label}</FalseInputLabel>
      {variant === 'field' ? (
        <FalseInputFieldBody>
          {(value !== undefined && (value as TODO)) || 'Ei määritelty'}
        </FalseInputFieldBody>
      ) : variant === 'checkbox' ? (
        <FalseInputCheckboxBody>
          <div className='absolute text-black'>{value === true ? <Check /> : null}</div>
        </FalseInputCheckboxBody>
      ) : null}
    </div>
  );
}
