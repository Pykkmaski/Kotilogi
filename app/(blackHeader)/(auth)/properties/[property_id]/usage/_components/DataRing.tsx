import { UsagePieChart } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/usage/_components/PieChart';

export function DataRing({ data, year }) {
  return (
    <div className='flex justify-center items-center relative'>
      <UsagePieChart data={data} />
      <div className='absolute text-2xl text-slate-500'>{year}</div>
    </div>
  );
}
