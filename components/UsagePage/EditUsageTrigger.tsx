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
      trigger={<i className='fa fa-pencil text-slate-500 cursor-pointer' />}
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
    </SubmitModalPrefab>
  );
}
