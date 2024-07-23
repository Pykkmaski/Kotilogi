import { UtilityDataType } from 'kotilogi-app/models/types';
import { UsagePieChart } from './PieChart';

type DataRingProps<T extends UtilityDataType> = {
  data: T[];
  label?: string;
};

export function DataRing<T extends UtilityDataType>({ data, label }: DataRingProps<T>) {
  return (
    <div className='flex justify-center items-center relative'>
      <UsagePieChart data={data} />
      <div className='absolute text-2xl text-slate-500'>{label}</div>
    </div>
  );
}
