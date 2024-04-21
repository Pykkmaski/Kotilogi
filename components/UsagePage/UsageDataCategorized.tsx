import { filterIntoObject } from 'kotilogi-app/utils/array';

const Label = ({ children }: React.PropsWithChildren) => (
  <div className='text-lg font-semibold'>{children}</div>
);

const Item = ({ children }: React.PropsWithChildren) => (
  <div className='flex gap-8 items-center justify-between'>{children}</div>
);

const Total = ({ data, units }: { data: Kotidok.UsageType[]; units: 'L' | 'kw/h' | 'mw/h' }) => {
  const total = data.map(d => d.price).reduce((acc, cur) => acc + cur, 0);
  const totalUnits = data.map(d => d.unitAmount).reduce((acc, cur) => acc + cur, 0);

  return (
    <span>
      {total.toFixed(2)}€, {totalUnits.toFixed(2)}
      {units}
    </span>
  );
};

type UsageDataCategorizedProps = {
  data: Kotidok.UsageType[];
};

export function UsageDataCategorized({ data }: UsageDataCategorizedProps) {
  const dataFiltered = filterIntoObject(data, 'type', ['water', 'heat', 'electric']);

  return (
    <div className='flex flex-col gap-4 text-slate-500'>
      {Object.keys(dataFiltered).map(key => {
        const displayKey = key === 'heat' ? 'Lämmitys' : key === 'water' ? 'Vesi' : 'Sähkö';
        const units = key === 'heat' ? 'mw/h' : key === 'water' ? 'L' : 'kw/h';

        return (
          <Item>
            <Label>{displayKey}:</Label>
            <Total data={dataFiltered[key]} units={units} />
          </Item>
        );
      })}
    </div>
  );
}
