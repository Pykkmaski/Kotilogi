'use client';
import { Card } from '@/components/UI/Card';
import { SkeletonCard } from '@/components/UI/SkeletonCard';
import { Spacer } from '@/components/UI/Spacer';

import { useMapArray } from '@/hooks/useMapArray';
import { Add } from '@mui/icons-material';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import Link from 'next/link';

type EventCardGridProps = {
  events: EventDataType[];
  propertyId: string;
};

export function EventCardGrid({ events, propertyId }: EventCardGridProps) {
  const content = useMapArray(events, item => (
    <Card
      title={item.title}
      description={item.description}
      href={`/dashboard/properties/${item.parentId}/events/${item.id}`}
      imageSrc='/img/kitchen.jpg'
    />
  ));

  return (
    <Spacer
      direction='row'
      gap='medium'>
      {content}

      <Link
        href={`/dashboard/properties/${propertyId}/events/add`}
        className='text-slate-500 cursor-pointer'
        title='Lisää Uusi Tapahtuma'>
        <SkeletonCard>
          <Spacer
            direction='col'
            gap='small'
            alignItems='center'
            justifyItems='center'>
            <Add />
            <span>Lisää Uusi</span>
          </Spacer>
        </SkeletonCard>
      </Link>
    </Spacer>
  );
}
