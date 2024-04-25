'use client';

import {
  ProPlanCard,
  RegularPlanCard,
} from 'kotilogi-app/app/(transparentHeader)/(index)/_components/ProfileTextContent';
import { UserPlanType, UserType } from 'kotilogi-app/types/UserType';
import * as payments from '@/actions/payments';
import { useRouter } from 'next/navigation';

type PlanCardsProps = {
  session: {
    user: UserType;
  };
};

export function PlanCards({ session }: PlanCardsProps) {
  const router = useRouter();

  return null;
}
