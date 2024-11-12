'use client';

import { MainAllCentered } from '@/components/UI/Main';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

export default function ActivatedPage({ searchParams }) {
  const router = useRouter();
  const action = searchParams.action as 'user_activated' | 'email_updated';
  const { update: updateSession, data: session, status } = useSession();

  const titleContent = useMemo(() => {
    if (action === 'user_activated') {
      return <>Tilin aktivointi onnistui!</>;
    } else if (action === 'email_updated') {
      return <>Sähköpostiosoitteen vaihto onnistui!</>;
    }
  }, [action]);

  const paragraphContent = useMemo(() => {
    if (action === 'user_activated') {
      return <>Käyttäjätilisi {searchParams.email} on nyt käytössä.</>;
    } else if (action === 'email_updated') {
      return <>Sähköpostiosoitteesi on nyt vaihdettu!</>;
    }
  }, [action]);

  const redirect = useCallback(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') {
      return;
    }

    const t = setTimeout(() => {
      if (action === 'user_activated') {
        updateSession({
          status: 1,
        })
          .then(() => {
            redirect();
          })
          .catch(err => toast.error(err.message));
      } else if (action === 'email_updated') {
        updateSession({ email: searchParams.newEmail }).then(() => {
          redirect();
        });
      }
    }, 3000);
  }, [status]);

  return (
    <MainAllCentered>
      <TitleWithParagraphLayout>
        {titleContent}
        {paragraphContent}
      </TitleWithParagraphLayout>
      <p>Sinut uudelleenohjataan kohta...</p>
    </MainAllCentered>
  );
}
