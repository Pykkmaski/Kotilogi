import React from 'react';

export function TitleWithParagraphLayout({ children }) {
  const [titleContent, paragraphContent, footerContent] = React.Children.toArray(children);

  return (
    <div className='flex justify-center gap-4'>
      <div className='flex flex-col gap-4 flex-3'>
        <h1 className='text-5xl text-slate-500 font-semibold xs:text-center lg:text-left'>
          {titleContent}
        </h1>
        <p className='text-lg xs:text-center lg:text-left'>{paragraphContent}</p>

        <div className='mt-4 flex gap-4 items-center font-semibold xs:justify-center lg:justify-start'>
          {footerContent}
        </div>
      </div>
    </div>
  );
}
