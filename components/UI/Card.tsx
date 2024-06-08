import { ReactNode } from 'react';
import { ListItemProps } from '../Feature/ListItem/ListItem';

type CardContainerProps = React.PropsWithChildren & {
  selected?: boolean;
};
function CardContainer({ children, selected }: CardContainerProps) {
  const className = [
    'flex flex-col rounded-md overflow-hidden shadow-md',
    selected ? 'border border-orange-500' : 'border-none',
  ];

  return <div className={className.join(' ')}>{children}</div>;
}

type CardImageProps = {
  src: string;
};

function CardImage({ src }: CardImageProps) {
  return (
    <img
      className='absolute top-0 left-0 object-center'
      src={src}
    />
  );
}

type CardTitleProps = {
  content: ReactNode;
};

function CardTitle({ content }: CardTitleProps) {
  return <div className='absolute bottom-0 left-0 px-2 pb-2'>{content}</div>;
}

type CardDescriptionProps = {
  content: ReactNode;
};

function CardDescription({ content }: CardDescriptionProps) {
  return <div className='p-2'>{content}</div>;
}

type CardProps = {
  selected?: boolean;
  imageSrc?: string;
  title: ReactNode;
  description: ReactNode;
};

export function Card({ selected, imageSrc, title, description }: CardProps) {
  return (
    <CardContainer selected={selected}>
      <div className='flex-1 relative w-full'>
        <CardImage src={imageSrc} />
        <CardTitle content={title} />
      </div>
      <CardDescription content={description} />
    </CardContainer>
  );
}
