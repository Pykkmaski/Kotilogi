'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Button, Switch } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Check, Cookie } from '@mui/icons-material';
import { acceptCookiesAction } from './acceptCookiesAction';
import { RenderOnCondition } from '../../Util/RenderOnCondition';
import { ToggleProvider } from '../../Util/ToggleProvider';
import colors from 'kotilogi-app/colors';

const showCookieNoticeKey = 'kotidok-show-cookie-notice';

const SwitchContainer = ({ children }: React.PropsWithChildren) => {
  return <div className='flex flex-row gap-4 items-center'>{children}</div>;
};

function CookieNoticeTrigger({ onClick = null }) {
  return (
    <div
      className='flex gap-2 items-center fixed z-50 bottom-4 right-4 cursor-pointer'
      onClick={onClick}>
      <span className='uppercase text-secondary text-sm xs:hidden lg:block'>Evästeasetukset</span>
      <button className='sm:p-2 xs:p-1 rounded-full border-secondary border'>
        <Cookie sx={{ color: colors['wf-primary'] }} />
      </button>
    </div>
  );
}

function CookieNoticeTarget({ isToggled: isVisible = null, onClose = null }) {
  const [cookies, setCookie] = useCookies();
  const cookieNoticeRef = useRef<HTMLDivElement>(null);

  const acceptCookies = async () => {
    localStorage.setItem(showCookieNoticeKey, 'false');
    onClose();
    await acceptCookiesAction();
  };

  const handleClickOutside = e => {
    if (cookieNoticeRef.current && !cookieNoticeRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <RenderOnCondition condition={isVisible}>
      <div
        onClick={handleClickOutside}
        ref={cookieNoticeRef}
        className='fixed bottom-4 xs:right-0 md:right-4 shadow-lg xs:w-full md:w-[500px] z-50 animate-slideup-slow flex items-center'>
        <div className='flex flex-col rounded-lg p-8 shadow-md bg-white'>
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
              </div>
            </div>

            <div className='flex gap-4 justify-end mt-4 border-t border-slate-200 pt-4 w-full'>
              <Button
                variant='text'
                sx={{ color: colors['wf-primary'] }}
                onClick={async e => {
                  setCookie('cookiesAccepted', 'only-necessary');
                  await acceptCookies();
                }}>
                Vain pakolliset
              </Button>

              <Button
                variant='contained'
                sx={{ backgroundColor: colors['wf-primary'], color: 'black' }}
                startIcon={<Check />}
                onClick={async e => {
                  setCookie('cookiesAccepted', 'all');
                  await acceptCookies();
                }}>
                Hyväksy kaikki
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RenderOnCondition>
  );
}

export function VPCookieNotice() {
  const getInitialState = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const savedState = localStorage.getItem(showCookieNoticeKey);

    if (!savedState) {
      return true;
    } else {
      return savedState === 'true';
    }
  }, []);

  return (
    <ToggleProvider initialState={getInitialState}>
      <ToggleProvider.Trigger>
        <CookieNoticeTrigger />
      </ToggleProvider.Trigger>

      <ToggleProvider.MUITarget>
        <CookieNoticeTarget />
      </ToggleProvider.MUITarget>
    </ToggleProvider>
  );
}
