'use client';

import { VPMenu } from '@/components/UI/VPMenu';
import { ToggleProvider } from '@/components/Util/ToggleProvider';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { MoreVert } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

export const PropertyCardHeaderContent = ({ item }) => {
  return (
    <>
      <ToggleProvider>
        <ToggleProvider.Trigger>
          <IconButton>
            <MoreVert sx={{ color: 'white' }} />
          </IconButton>
        </ToggleProvider.Trigger>

        <ToggleProvider.MUITarget>
          <VPMenu>
            <Link href={`/dashboard/properties/${item.id}/edit`}>Muokkaa</Link>
            <Link
              href={`/dashboard/properties/${item.id}/events`}
              title='Näytä tapahtumat'>
              Tapahtumat
            </Link>
            <Link
              href={`/dashboard/properties/${item.id}/files`}
              title='Näytä tiedostot'>
              Tiedostot
            </Link>
            <Link
              href={`/dashboard/properties/${item.id}/utility`}
              title='Näytä kulutustiedot'>
              Kulutustiedot
            </Link>
            <Link
              title='Poista talo...'
              href={`/dashboard/properties/${item.id}/delete`}>
              Poista
            </Link>
          </VPMenu>
        </ToggleProvider.MUITarget>
      </ToggleProvider>
    </>
  );
};
