'use client';

import { Group } from '@/components/UI/Group';
import { Header } from '@/components/UI/Header/Header';
import { useUserProviderContext } from '../../../UserProvider';

export function DesktopNavbarHeader() {
  const { user } = useUserProviderContext();

  return (
    <Header>
      <Group
        direction='col'
        gap={0}>
        <span className='text-white text-sm'>{user.email}</span>
        <h3 className='text-xl text-white'>Hallintapaneeli</h3>
      </Group>
    </Header>
  );
}
