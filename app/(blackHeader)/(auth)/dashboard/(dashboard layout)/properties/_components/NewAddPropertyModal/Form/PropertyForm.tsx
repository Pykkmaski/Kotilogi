import { FormEvent, forwardRef, useRef } from 'react';
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
  onChange: (e: TODO) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
};

function Component({ onChange, onSubmit, id }: SubmitFormProps, ref: React.Ref<HTMLFormElement>) {
  return (
    <form
      ref={ref}
      id={id}
      className={style.container}
      onChange={onChange}
      onSubmit={async (e: TODO) => {
        onSubmit(e).then(() => e.target.reset());
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

export const PropertyForm = forwardRef(Component);
