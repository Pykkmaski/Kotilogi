import { TypeNav } from '@/components/UsagePage/TypeNav';
import { useUsageProviderContext } from './UsageProvider';
import Link from 'next/link';

export function UsageTypeSelector() {
  const { displayYear } = useUsageProviderContext();

  return (
    <TypeNav>
      <Link href={`?type=all&year=${displayYear}`}>Kaikki</Link>
      <Link href={`?type=heat&year=${displayYear}`}>Lämmitys</Link>
      <Link href={`?type=water&year=${displayYear}`}>Vesi</Link>
      <Link href={`?type=electric&year=${displayYear}`}>Sähkö</Link>
    </TypeNav>
  );
}
