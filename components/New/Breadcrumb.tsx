'use client';

import { isUUID } from 'kotilogi-app/utils/isUUID';
import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Spacer } from '../UI/Spacer';
import { RenderOnCondition } from '../Util/RenderOnCondition';
import { useMemo } from 'react';
import { useMapArray } from '@/hooks/useMapArray';

const tranlsatePathname = (href: string) => {
  const current = href.split('/').at(-1);

  switch (current) {
    case 'dashboard':
      return 'Hallintapaneeli';

    case 'properties':
      return 'Talot';

    case 'add':
      return 'Lisää Uusi';

    case 'events':
      return 'Tapahtumat';

    case 'files':
      return 'Tiedostot';

    case 'delete':
      return 'Poista';

    case 'edit':
      return 'Muokkaa';

    case 'steps':
      return 'Vaiheet';

    case 'settings':
      return 'Asetukset';

    case 'utility':
      return 'Kulutus';

    default: {
      const previous = href.split('/').at(-2);
      if (previous && isUUID(current)) {
        switch (previous) {
          case 'properties':
            return 'Valittu Talo';
          case 'events':
            return 'Valittu Tapahtuma';
        }
      }
      return current;
    }
  }
};

/**Renders a breadcrumb of the current path, where each step is a clickable link. Will translate the names of the paths if a translation is available. */
export function Breadcrumb() {
  const path = usePathname();
  const links = useMemo(() => {
    const result = path.split('/');
    result.shift();
    return result;
  }, [path]);

  const hrefs = useMemo(() => {
    const hrefs: string[] = [];
    for (let i = 0; i < links.length; ++i) {
      const current = links[i];
      const previous = hrefs[i - 1];
      hrefs.push(previous ? `${previous}/${current}` : `/${current}`);
    }

    return hrefs;
  }, [links]);

  const breadcrumbs = useMapArray(hrefs, (href, i) => {
    return (
      <>
        <Link
          href={href}
          className={[
            'text-secondary xs:text-sm sm:text-base text-nowrap',
            i == links.length - 1 ? 'font-semibold' : 'font-normal',
          ].join(' ')}>
          {tranlsatePathname(href)}
        </Link>
        <RenderOnCondition condition={i < links.length}>/</RenderOnCondition>
      </>
    );
  });

  return (
    <Spacer
      direction='row'
      gap={'medium'}>
      {breadcrumbs}
    </Spacer>
  );
}
