'use client';

import { VPMenu } from '@/components/UI/VPMenu';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { MoreVert } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

export function EventCardHeaderContent({ propertyId, item }) {
  return (
    <VisibilityProvider>
      <VisibilityProvider.Trigger setAsAnchorForMUI>
        <IconButton>
          <MoreVert sx={{ color: 'white' }} />
        </IconButton>
      </VisibilityProvider.Trigger>

      <VisibilityProvider.Target>
        <VPMenu>
          <Link
            title='Muokkaa tietoja'
            href={`/dashboard/properties/${propertyId}/events/${item.id}/edit`}>
            Muokkaa
          </Link>

          <Link
            title='Näytä tiedostot'
            href={`/dashboard/properties/${propertyId}/events/${item.id}/files`}>
            Tiedostot
          </Link>
          <Link href={`${propertyId}/events/${item.id}/delete`}>Poista</Link>
        </VPMenu>
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
