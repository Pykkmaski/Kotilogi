'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/Feature/Input';
import { ContentCard } from '@/components/UI/RoundedBox';
import { Group } from '@/components/UI/Group';
import Link from 'next/link';
import { Padding } from '@/components/UI/Padding';
import { ErrorText } from '@/components/UI/Text';
import { useLogin } from './useLogin';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import Spinner from '@/components/UI/Spinner';

export default function LoginPage() {
  const router = useRouter();
  //const {updateData} = useInputData({});
  const { loginHandler, updateData, status } = useLogin();
  const loginCode = parseInt(useSearchParams().get('code'));

  const cancelHandler = () => {
    router.push('/');
  };

  useEffect(() => {
    if (loginCode == 1) {
      console.log(loginCode);
      toast.success('Käyttäjätili aktivoitu onnistuneesti!');
    }
  }, [loginCode]);

  const loading = status === 'loading';

  return (
    <main className='flex gap-4'>
      <Padding>Login page</Padding>
    </main>
  );
}
