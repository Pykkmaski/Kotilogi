import { ObjectDataType } from 'kotilogi-app/models/types';
import Image from 'next/image';
import { TertiaryHeading } from './Typography/Headings';

type CardProps<T extends ObjectDataType> = {
  item: T & { imageId: string };
};

export function Card<T extends ObjectDataType>({ item }: CardProps<T>) {
  return (
    <div className='flex flex-col shadow-lg w-[100px] h-[200px] rounded-lg overflow-hidden'>
      {/**The container for the image */}
      <div className='relative w-full'>
        <Image
          src={item.imageId}
          alt=''
          className='absolute top-0 left-0'
          objectFit='cover'
        />
        <div className='p-2 w-full'>
          <TertiaryHeading>{item.title}</TertiaryHeading>
        </div>
      </div>
    </div>
  );
}
