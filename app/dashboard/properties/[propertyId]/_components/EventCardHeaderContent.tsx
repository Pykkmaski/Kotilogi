'use client';

import { MenuPrefab, VPMenu } from '@/components/UI/VPMenu';
import { MoreVert } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

export function EventCardHeaderContent({ propertyId, item }) {
  return (
    <MenuPrefab
      trigger={
        <IconButton>
          <MoreVert sx={{ color: 'white' }} />
        </IconButton>
      }
      target={
        <VPMenu>
          <Link
            title='Muokkaa tietoja'
            href={`/dashboard/properties/${propertyId}/events/${item.id}/edit`}>
            Muokkaa
          </Link>

          <Link
            title='Näytä tiedostot'
            href={`/dashboard/files?parentId=${item.id}&returnUrl=/dashboard/properties/${propertyId}/`}>
            Tiedostot
          </Link>
          <Link href={`${propertyId}/events/${item.id}/delete`}>Poista</Link>
        </VPMenu>
      }
    />
  );
}
