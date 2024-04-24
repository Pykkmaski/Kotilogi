'use client';

import { Input } from '../Input/Input';
import { useItemContext } from './DataList';
import { SubmitModalPrefab } from '../SubmitModalPrefab';
import { update as updateUsage } from '@/actions/usage';
import toast from 'react-hot-toast';

export function EditUsageTrigger() {
  const { item } = useItemContext();

  return (
    <SubmitModalPrefab<Kotidok.UsageType>
      icon={item.type === 'heat' ? 'fa-fire' : item.type === 'water' ? 'fa-tint' : 'fa-bolt'}
      trigger={
        <i
          className='fa fa-pencil text-slate-500 cursor-pointer'
          title='Muokkaa...'
        />
      }
      modalTitle='Muokkaa tietoa'
      submitText='Hyväksy'
      submitMethod={async data => {
        updateUsage(item.id, data)
          .then(() => toast.success('Tiedon päivitys onnistui!'))
          .catch(err => toast.error(err.message));
      }}>
      <Input
        label='Hinta'
        description='Laskun hinta.'
        name='price'
        type='number'
        step='0.01'
        min='0.01'
        defaultValue={item.price}
      />

      <Input
        label='Määrä'
        description='Määrä yksiköissä'
        name='unitAmount'
        type='number'
        step='0.01'
        min='0.01'
        defaultValue={item.unitAmount}
      />
    </SubmitModalPrefab>
  );
}
