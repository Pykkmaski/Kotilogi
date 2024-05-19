'use client';

import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { Button, Tab, Tabs } from '@mui/material';
import { NewAddPropertyModalTrigger } from './NewAddPropertyModal/NewAddPropertyModal';
import { addProperty } from '@/actions/experimental/properties';
import { Add } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

type PropertyTabsProps = {
  properties: Kotidok.PropertyType[];
};

export function PropertyTabs({ properties }: PropertyTabsProps) {
  const pathname = usePathname();

  return (
    <Tabs value={pathname}>
      {properties.map((p, i) => (
        <Tab
          label={p.title}
          component='a'
          href={`/dashboard/properties/${p.id}`}
        />
      ))}

      <Button
        variant='text'
        title='Lisää talo'>
        <Add />
      </Button>
    </Tabs>
  );
}
