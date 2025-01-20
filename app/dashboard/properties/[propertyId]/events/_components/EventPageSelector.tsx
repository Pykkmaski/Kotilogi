'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

type EventPageSelectorProps = {
  q: string;
  currentPage: number;
  maxPages: number;
};

/**Renders the buttons for changing the page of the displayed events. */
export function EventPageSelector({ q, currentPage, maxPages }: EventPageSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const changePage = (newPage: number) => {
    if (newPage < 0 || newPage == maxPages) {
      return;
    }

    const search = new URLSearchParams();
    search.set('q', q);
    search.set('page', newPage.toString());
    router.push(`${pathname}?${search.toString()}`);
  };

  /**Ductape fix for the pages overflowing if a search returns less results than what the determined page count is.
   * @todo Figure out a better way.
   */
  if (currentPage >= maxPages) {
    console.log('Switching to the first page.');
    changePage(0);
  }

  return (
    <div
      className='w-full flex gap-4 justify-end'
      id='event-pagination'>
      {currentPage != 0 && (
        <button
          type='button'
          disabled={currentPage == 0}
          onClick={() => changePage(currentPage - 1)}>
          Edellinen
        </button>
      )}

      {currentPage < maxPages - 1 && (
        <button
          type='button'
          disabled={currentPage == maxPages}
          onClick={() => changePage(currentPage + 1)}>
          Seuraava
        </button>
      )}
    </div>
  );
}
