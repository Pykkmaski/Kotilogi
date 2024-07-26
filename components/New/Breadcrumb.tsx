'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tranlsatePathname = (href: string) => {
  const current = href.split('/').at(-1);
  const previous = href.split('/').at(-2);

  switch (current) {
    case 'newDashboard':
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

    default:
      if ((previous && previous == 'properties') || previous == 'events') {
        return 'ID';
      } else {
        return current;
      }
  }
};

/**Renders a breadcrumb of the current path, where each step is a clickable link. Will translate the names of the paths if a translation is available. */
export function Breadcrumb() {
  const path = usePathname();
  const links = path.split('/');
  links.shift();

  const getHrefs = () => {
    const hrefs: string[] = [];
    for (let i = 0; i < links.length; ++i) {
      const current = links[i];
      const previous = hrefs[i - 1];
      hrefs.push(previous ? `${previous}/${current}` : `/${current}`);
    }

    return hrefs;
  };

  const generateCrumbs = () => {
    return getHrefs().map((href, i) => {
      return (
        <>
          <Link
            href={href}
            className={[
              'text-teal-500',
              i == links.length - 1 ? 'font-semibold' : 'font-normal',
            ].join(' ')}>
            {tranlsatePathname(href)}
          </Link>
          {i < links.length - 1 ? <span>/</span> : null}
        </>
      );
    });
  };

  return <div className='flex flex-row gap-2 overflow-x-scroll mb-2'>{generateCrumbs()}</div>;
}
