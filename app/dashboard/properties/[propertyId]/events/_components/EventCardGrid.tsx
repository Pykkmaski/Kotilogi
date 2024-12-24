'use client';
import { Card } from '@/components/UI/Card';
import { SkeletonCard } from '@/components/UI/SkeletonCard';
import { Spacer } from '@/components/UI/Spacer';

import { useMapArray } from '@/hooks/useMapArray';
import { Add } from '@mui/icons-material';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import Link from 'next/link';

type EventCardGridProps = {
  events: EventPayloadType[];
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
      dir='row'
      gap='medium'>
      {content}

      <Link
        href={`/dashboard/properties/${propertyId}/events/add`}
        className='text-slate-500 cursor-pointer'
        title='Lisää Uusi Tapahtuma'>
        <SkeletonCard>
          <Spacer
            dir='col'
            gap='small'
            items='center'
            justify='center'>
            <Add />
            <span>Lisää Uusi</span>
          </Spacer>
        </SkeletonCard>
      </Link>
    </Spacer>
  );
}
