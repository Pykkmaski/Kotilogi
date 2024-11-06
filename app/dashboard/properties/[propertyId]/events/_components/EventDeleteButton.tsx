'use client';

import { VPCloseOnActionButton } from '@/components/UI/VPCloseOnActionButton';
import { Delete } from '@mui/icons-material';
import { deleteEventAction } from '../[eventId]/delete/_components/actions';

export const EventDeleteButton = ({ id }) => (
  <VPCloseOnActionButton
    action={async () => {
      await deleteEventAction(id);
    }}
    startIcon={<Delete />}
    color='warning'>
    Poista
  </VPCloseOnActionButton>
);
