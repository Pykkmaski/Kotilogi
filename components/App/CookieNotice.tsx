'use client';

import { useEffect, useRef, useState } from 'react';
import { RoundedBox } from '../UI/RoundedBox';
import { Button, Switch } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Cookie } from '@mui/icons-material';
import { acceptCookiesAction } from './actions/acceptCookiesAction';

const showCookieNoticeKey = 'kotidok-show-cookie-notice';

const SwitchContainer = ({ children }: React.PropsWithChildren) => {
  return <div className='flex flex-row gap-4 items-center'>{children}</div>;
};

export function CookieNotice() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedState = localStorage.getItem(showCookieNoticeKey);

    if (!savedState) {
      return true;
    } else {
      return savedState === 'true';
    }
  });

  const [cookies, setCookie] = useCookies();
  const cookieNoticeRef = useRef<HTMLDivElement>(null);

  const acceptCookies = async () => {
    localStorage.setItem(showCookieNoticeKey, 'false');
    setShow(false);
    await acceptCookiesAction();
  };

  const handleClickOutside = e => {
    if (cookieNoticeRef.current && !cookieNoticeRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className='flex gap-2 items-center fixed z-50 bottom-4 right-4 cursor-pointer'
        onClick={() => setShow(prev => !prev)}>
        <span className='uppercase text-secondary text-sm xs:hidden lg:block'>Evästeasetukset</span>
        <button className='sm:p-2 xs:p-1 rounded-full border-secondary border'>
          <Cookie color='secondary' />
        </button>
      </div>

      {show && (
        <div
          onClick={handleClickOutside}
          ref={cookieNoticeRef}
          className='fixed bottom-4 xs:right-0 md:right-4 shadow-lg xs:w-full md:w-[500px] z-50 animate-slideup-slow flex items-center'>
          <RoundedBox>
            <div className='flex flex-col gap-4 items-center'>
              <div className='flex w-full justify-between gap-4 xs:items-start md:items-center'>
                <div className='text-lg text-slate-500 flex flex-col gap-2'>
                  <strong>Evästeasetukset</strong>
                  <p>
                    Pakollisten, sovelluksen toiminnan kannalta välttämättömien evästeiden lisäksi
                    käytämme myös evästeitä tilastointiin, kuten kävijöiden määrän seuraamiseen.
                    <br />
                    Voit halutessasi sallia näiden vaihtoehtoisten evästeiden käytön.
                  </p>
                  <SwitchContainer>
                    <Switch
                      color='secondary'
                      disabled
                      checked
                    />
                    <label>Pakolliset</label>
                  </SwitchContainer>
                  <SwitchContainer>
                    <Switch
                      color='secondary'
                      name='kotidok-analytics-accepted'
                      onChange={e => setCookie(e.target.name, e.target.checked)}
                      checked={cookies['kotidok-analytics-accepted']}
                    />
                    <label>Tilastointi</label>
                  </SwitchContainer>
                </div>
              </div>

              <div className='flex gap-4 justify-end mt-4 border-t border-slate-200 pt-4 w-full'>
                <div className='w-[100px] [&>*]:w-full'>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={acceptCookies}>
                    Vahvista
                  </Button>
                </div>
              </div>
            </div>
          </RoundedBox>
        </div>
      )}
    </>
  );
}
