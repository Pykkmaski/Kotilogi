'use client';

import { VPCloseOnActionButton } from '@/components/UI/VPCloseOnActionButton';
import { Delete } from '@mui/icons-material';
import { deleteEventAction } from '../actions/deleteEventAction';

export const EventDeleteButton = ({ id }) => (
  <VPCloseOnActionButton
    executeAction={
      (async () => {
        await deleteEventAction(id);
      }) as any
    }
    startIcon={<Delete />}
    color='warning'>
    Poista
  </VPCloseOnActionButton>
);
