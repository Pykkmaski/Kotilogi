'use client';

import { useEffect, useRef, useState } from 'react';
import { Group } from '../Group';
import { MediumDevices, SmallDevices } from '../Util/Media';

const containerClassName = 'md:grid md:grid-cols-inputComponentColumns xs:flex xs:flex-col xs:gap-1 w-full md:min-h-[2rem] md:gap-1';
const inputClassName = 'flex-1 px-[0.5rem] rounded-[10px] w-full border bg-white border-[#DDD] disabled:bg-[#EEE] w-full';

function Label(props: { text: string; description?: string; required?: boolean }) {
  const getRequiredBadge = () => {
    if (props.required) {
      return <span className='text-[#b27070] text-sm'>Pakollinen</span>;
    } else {
      return null;
    }
  };

  const getDescriptionElement = () => {
    if (props.description) {
      return <span className='text-sm text-slate-500'>{props.description}</span>;
    } else {
      return null;
    }
  };

  return (
    <Group direction='col' justify='center'>
      <span className='text-[1.1rem] text-black'>
        {props.text} {getRequiredBadge()}
      </span>
      {getDescriptionElement()}
    </Group>
  );
}

function MobileLabel({ children }) {
  return <div className='w-full flex gap-2 items-baseline justify-between'>{children}</div>;
}

function RequiredBadge() {
  return <span className='absolute self-center justify-self-center font-semibold'>!</span>;
}

export type InputProps = React.ComponentProps<'input'> & {
  label: string;
  description?: string;
  ref?: any;
};

export function Input({ label, description, ...props }: InputProps) {
  return (
    <div className={containerClassName}>
      <MediumDevices>
        <Label text={label} required={props.required} description={description} />
      </MediumDevices>

      <SmallDevices>
        <MobileLabel>
          <label>{label}</label>
          {props.required ? <span className='text-red-400 text-sm'>Pakollinen</span> : null}
        </MobileLabel>
      </SmallDevices>

      <input {...props} className={inputClassName} ref={props.ref} />
    </div>
  );
}

type InputGroupProps = React.PropsWithChildren & InputProps;

/**Same as the regular Input exported by this module, but the input element(s) must be provided as children.*/
export function InputGroup({ children, ...props }: InputGroupProps) {
  return (
    <div className={containerClassName}>
      <MediumDevices>
        <Label text={props.label} required={props.required} description={props.description} />
      </MediumDevices>

      <SmallDevices>
        <MobileLabel>
          <label>{props.label}</label>
          {props.required ? <span className='text-red-400 text-sm'>Pakollinen</span> : null}
        </MobileLabel>
      </SmallDevices>

      {children}
    </div>
  );
}

export type SelectProps = React.ComponentProps<'select'> & {
  label: string;
  description?: string;
};

/**
 * A select component containing within it a label.
 * @param props
 * @returns
 */
export function Select(props: SelectProps) {
  return (
    <div className={containerClassName}>
      <MediumDevices>
        <Label text={props.label} description={props.description} required={props.required} />
      </MediumDevices>

      <SmallDevices>
        <MobileLabel>
          <label>{props.label}</label>
          {props.required ? <span className='text-red-400 text-sm'>Pakollinen</span> : null}
        </MobileLabel>
      </SmallDevices>

      <select className={inputClassName} {...props}>
        {props.children}
      </select>
    </div>
  );
}

function Option({ children, ...props }: React.ComponentProps<'option'>) {
  return <option {...props}>{children}</option>;
}

Select.Option = Option;

function TextareaCharacterCounter({ currentLength, max }: { currentLength: number | undefined; max: number | undefined }) {
  return (
    <Group direction='row' gap={4}>
      <span>
        {currentLength} / {max}
      </span>
    </Group>
  );
}

export type TextAreaProps = React.ComponentProps<'textarea'> & {
  label: string;
  description?: string;
};

export function Textarea({ label, description, ...props }: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [length, setLength] = useState<number | undefined>(undefined);

  const textareaClassName = ['flex-col', inputClassName];

  useEffect(() => setLength(ref.current?.value.length), []);
  return (
    <div className={containerClassName}>
      <MediumDevices>
        <Label text={label} {...props} />
      </MediumDevices>

      <SmallDevices>
        <MobileLabel>
          <label>{label}</label>
          {props.required ? <span className='text-red-400 text-sm'>Pakollinen</span> : null}
        </MobileLabel>
      </SmallDevices>

      <Group direction='col' gap={2}>
        <textarea
          {...props}
          className={textareaClassName.join(' ')}
          ref={ref}
          onChange={e => {
            props.onChange && props.onChange(e);
            setLength(ref.current?.value.length);
          }}
        />
      </Group>
    </div>
  );
}
