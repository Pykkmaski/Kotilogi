'use client';

import { MainAllCentered } from '@/components/UI/Main';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

/**
 * A general page users get directed to when they perform an action, like activating their account.
 * @todo Rename this page to something fitting for its purpose.
 */
export default function ActivatedPage({ searchParams }) {
  const router = useRouter();
  const action = searchParams.action as 'user_activated' | 'email_updated' | 'property_transfer';
  const { update: updateSession, status } = useSession();

  const titleContent = useMemo(() => {
    if (action === 'user_activated') {
      return <>Tilin aktivointi onnistui!</>;
    } else if (action === 'email_updated') {
      return <>Sähköpostiosoitteen vaihto onnistui!</>;
    } else if (action === 'property_transfer') {
      return <>Talon omistajuuden siirto onnistui!</>;
    }
  }, [action]);

  const paragraphContent = useMemo(() => {
    if (action === 'user_activated') {
      return <>Käyttäjätilisi {searchParams.email} on nyt käytössä.</>;
    } else if (action === 'email_updated') {
      return <>Sähköpostiosoitteesi on nyt vaihdettu!</>;
    } else if (action === 'property_transfer') {
      const streetAddress = searchParams.streetAddress;
      return <>Talon {streetAddress} omistajuus siirrety onnistuneesti!</>;
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
        const { new_email: newEmail } = searchParams;
        if (!newEmail) {
          throw new Error('Pyynnöstä puuttuu käyttäjän uusi sähköpostiosoite!');
        }
        updateSession({ email: searchParams.new_email }).then(() => {
          redirect();
        });
      } else {
        redirect();
      }

      return () => clearTimeout(t);
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
