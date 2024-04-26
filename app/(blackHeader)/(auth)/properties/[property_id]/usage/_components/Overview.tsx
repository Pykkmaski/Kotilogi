import { AllUsageDataChart } from './AllUsageDataChart';
import { UsagePieChart } from './PieChart';

function WaterPrice({ waterPrice }) {
  return (
    <div className='text-blue-400 flex flex-col'>
      <span className='text-sm'>Vesikulut yhteensä:</span>
      <h1 className='text-4xl'>{waterPrice.toFixed(2)}€</h1>
    </div>
  );
}

function HeatingPrice({ heatingPrice }) {
  return (
    <div className='text-red-400 flex flex-col'>
      <span className='text-sm'>Lämmityskulut yhteensä:</span>
      <h1 className='text-4xl'>{heatingPrice.toFixed(2)}€</h1>
    </div>
  );
}

function ElectricityPrice({ electricityPrice }) {
  return (
    <div className='text-yellow-400 flex flex-col'>
      <span className='text-sm'>Sähkökulut yhteensä:</span>
      <h1 className='text-4xl'>{electricityPrice.toFixed(2)}€</h1>
    </div>
  );
}

function MaxPrice({ maxPrice }) {
  return (
    <div className='text-slate-400 flex flex-col'>
      <span className='text-sm'>Korkein kulu aikaväliltä:</span>
      <h1 className='text-4xl'>{maxPrice.toFixed(2)}€</h1>
    </div>
  );
}

export function Overview({ data }) {
  const getUsagePriceByType = (type?: Kotidok.UsageTypeType): number => {
    if (type) {
      return data.filter(d => d.type === type).reduce((acc: number, cur) => acc + cur.price, 0);
    } else {
      return data.reduce((acc: number, cur) => acc + cur.price, 0);
    }
  };

  const totalPrice = getUsagePriceByType();
  const waterPrice = getUsagePriceByType('water');
  const heatingPrice = getUsagePriceByType('heat');
  const electricityPrice = getUsagePriceByType('electric');

  const currentHighest = Math.max(waterPrice, heatingPrice, electricityPrice);
  return (
    <div className='flex gap-4'>
      <div className='w-[500px] relative flex items-center justify-center'>
        <div className='w-full'>
          <UsagePieChart data={data} />
        </div>
      </div>

      <div className='flex flex-col gap-4'></div>
    </div>
  );
}