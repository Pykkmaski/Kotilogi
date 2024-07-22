import { CSSProperties, ReactNode } from 'react';
import { ListItemProps } from '../Feature/ListItem/ListItem';
import Image from 'next/image';
import { ObjectDataType } from 'kotilogi-app/models/types';

type CardContainerProps = React.PropsWithChildren & {
  selected?: boolean;
};

function CardContainer({ children, selected }: CardContainerProps) {
  const className = [
    'flex flex-col rounded-md overflow-hidden shadow-md w-[250px] h-[350px]',
    selected ? 'border border-orange-500' : 'border-none',
  ];

  return <div className={className.join(' ')}>{children}</div>;
}

function CardGradient() {
  return (
    <div className='absolute top-0 left-0 bg-gradient-to-b from-transparent via-transparent to-black w-full h-full z-10' />
  );
}

type CardHeaderProps<T extends ObjectDataType> = {
  ContentComponent?: () => React.ReactNode;
};

/**Rendered at the top of the cards image. Should take a ContentComponent returning a fragment with the desired contents of the header. */
function CardHeader<T extends ObjectDataType>({ ContentComponent }: CardHeaderProps<T>) {
  return (
    <div className='flex flex-row gap-2 items-center justify-end absolute top-0 left-0 w-full z-20 p-2 bg-[#0008]'>
      {ContentComponent ? <ContentComponent /> : null}
    </div>
  );
}

type CardImageProps = {
  src: string;
};

function CardImage({ src }: CardImageProps) {
  return (
    <Image
      src={src}
      alt=''
      fill={true}
      objectFit='cover'
    />
  );
}

type CardTitleProps = {
  content: ReactNode;
};

function CardTitle({ content }: CardTitleProps) {
  return (
    <div className='absolute bottom-0 left-0 px-2 pb-2 z-20 text-white font-semibold'>
      {content || 'Ei Otsikkoa'}
    </div>
  );
}

type CardDescriptionProps = {
  content: ReactNode;
};

function CardDescription({ content }: CardDescriptionProps) {
  const style: CSSProperties = {
    lineClamp: 3,
  };
  return (
    <div
      style={style}
      className='p-2 h-[100px] overflow-hidden text-ellipsis whitespace-pre-wrap'>
      {content}
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  selected?: boolean;
  imageSrc?: string;
  HeaderComponent?: () => React.ReactNode;
};

export function Card({ selected, imageSrc, HeaderComponent, title, description }: CardProps) {
  return (
    <CardContainer selected={selected}>
      <div className='flex-1 relative w-full h-[50%]'>
        <CardHeader ContentComponent={HeaderComponent} />
        <CardImage src={imageSrc} />
        <CardTitle content={title} />
        <CardGradient />
      </div>
      <CardDescription content={description} />
    </CardContainer>
  );
}