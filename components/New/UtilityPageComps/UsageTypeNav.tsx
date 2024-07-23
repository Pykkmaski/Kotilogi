import { useUsageProviderContext } from './UsageProvider';
import Link from 'next/link';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { TypeNav } from './TypeNav';

export function UsageTypeSelector() {
  const { displayYear } = useUsageProviderContext();

  return (
    <TypeNav>
      <Link href={`?type=${UtilityType.ALL}&year=${displayYear}`}>Kaikki</Link>
      <Link href={`?type=${UtilityType.HEAT}&year=${displayYear}`}>Lämmitys</Link>
      <Link href={`?type=${UtilityType.WATER}&year=${displayYear}`}>Vesi</Link>
      <Link href={`?type=${UtilityType.ELECTRIC}&year=${displayYear}`}>Sähkö</Link>
    </TypeNav>
  );
}
