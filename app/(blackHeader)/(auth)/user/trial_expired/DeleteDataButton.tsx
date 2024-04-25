'use client';

import Button from '@/components/UI/Button/Button';
import * as users from '@/actions/users';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export function DeleteDataButton({ children, session }) {
  const deleteData = async () => {
    const c = confirm('Oletko varma että haluat poistaa tilisi ja kaikki siihen liittyvät tiedot?');
    if (!c) return;

    //Delete the user and log out.
    users
      .del(session.user.email)
      .then(async () => {
        signOut({
          callbackUrl: '/',
        }).then(() => toast.success('Tilisi on poistettu onnistuneesti!'));
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <Button
      variant='secondary'
      onClick={deleteData}>
      {children}
    </Button>
  );
}
