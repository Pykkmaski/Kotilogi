'use client';

import { FalseInputFieldBody, FalseInputLabel } from '@/components/UI/FalseInput';
import { CopyAll } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { generateTokenAction } from './actions';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { TextEllipsis } from '@/components/UI/TextEllipsis';
import { ErrorText, SuccessText } from '@/components/UI/Text';

export function TokenGenerationField({ propertyId }) {
  const { data: url, isLoading } = useQuery({
    queryKey: [`${propertyId}-transfer-token`],
    queryFn: async () => generateTokenAction(propertyId),
  });

  const [status, setStatus] = useState<'copied' | 'error' | 'idle'>('idle');

  const copyToClipboard = useCallback(() => {
    setStatus('idle');
    navigator.clipboard
      .writeText(url)
      .then(() => setStatus('copied'))
      .catch(() => setStatus('error'));
  }, [url, setStatus]);

  return (
    <div className='flex flex-col'>
      <FalseInputLabel>Varmenne</FalseInputLabel>
      <div className='flex gap-2 w-full items-center'>
        <FalseInputFieldBody>
          {isLoading ? <Spinner /> : <TextEllipsis>{url}</TextEllipsis>}
        </FalseInputFieldBody>
        <IconButton
          title='Kopioi'
          onClick={copyToClipboard}>
          <CopyAll />
        </IconButton>
      </div>
      {status === 'copied' ? (
        <SuccessText>Varmenne kopioitu leikepöydälle!</SuccessText>
      ) : status === 'error' ? (
        <ErrorText>Varmenteen kopiointi epäonnistui!</ErrorText>
      ) : null}
    </div>
  );
}
