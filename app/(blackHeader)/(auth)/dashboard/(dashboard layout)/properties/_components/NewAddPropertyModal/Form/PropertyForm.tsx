import { FormEvent, useRef } from 'react';
import style from '../style.module.css';
import { TargetTypeField } from './TargetTypeField';
import { GeneralField } from './GeneralField';
import { InteriorField } from './InteriorField';
import { HeatingField } from './HeatingField';
import { OtherInfoField } from './OtherInfoField';
import { YardField } from './YardField';
import { ExteriorField } from './ExteriorField';

type SubmitFormProps = {
  id: string;
  onChange: (e) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
};

export function SubmitForm({ onChange, onSubmit, id }: SubmitFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      id={id}
      className={style.container}
      onChange={onChange}
      onSubmit={async e => {
        onSubmit(e).then(() => ref.current?.reset());
      }}>
      <GeneralField />
      <ExteriorField />
      <YardField />
      <InteriorField />

      <HeatingField />
      <OtherInfoField />
    </form>
  );
}
