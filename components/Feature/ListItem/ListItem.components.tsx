import Link from 'next/link';
import style from './style.module.scss';
import { Group } from '../../UI/Group';

type TitleContainerProps = React.PropsWithChildren & {
  titleText: string;
  iconSrc: string;
  icon?: string;
};

export function TitleContainer({ children, ...props }: TitleContainerProps) {
  return (
    <div className='flex justify-between items-center'>
      {props.icon ? (
        <i className={`fa ${props.icon} text-base text-black`} />
      ) : (
        <img
          src={props.iconSrc}
          className='aspect-square w-[25px]'
        />
      )}

      <span className='text-black'>{props.titleText}</span>
      {children}
    </div>
  );
}

type EventTitleContainerProps = TitleContainerProps & {
  consolidationTime: string;
};

export function EventTitleContainer({ consolidationTime, ...props }: EventTitleContainerProps) {
  const isConsolidated = Date.now() >= parseInt(consolidationTime);

  const getConsolidatedMessage = () => {
    if (!isConsolidated) {
      const consolidationDate = new Date(parseInt(consolidationTime));
      return (
        <div
          className={style.notConsolidatedTitle}
          title='Tapahtumaa ei ole vakiinnutettu ja on muokattavissa.'>
          Vakiintuu {consolidationDate.toLocaleDateString('fi-FI')}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Group
      direction='row'
      align='center'
      gap={2}>
      {isConsolidated ? (
        <img
          src='/icons/padlock.png'
          className={style.icon}
          title='Tapahtuma on vakiinnutettu, eikä sitä voi muokata.'
        />
      ) : null}
      <TitleContainer {...props} />
      {getConsolidatedMessage()}
    </Group>
  );
}

type DescriptionContainerProps = {
  text: string;
};

export function DescriptionContainer(props: DescriptionContainerProps) {
  return <div className={style.description}>{props.text}</div>;
}

type InfoContainerProps = React.PropsWithChildren & {
  /**The link to the page clicking this component will route to */
  href: string;
  target?: string;
};

export function InfoContainer({ children, href, target }: InfoContainerProps) {
  return (
    <Link
      href={href}
      target={target}
      className={style.informationContainer}>
      {children}
    </Link>
  );
}

export function DeleteButton(
  props: React.ComponentProps<'img'> & {
    onClick: () => void;
  }
) {
  return (
    <img
      src='/icons/bin.png'
      className={style.icon}
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

export function ControlsContainer({ children }: React.PropsWithChildren) {
  return <div className={style.controlsContainer}>{children}</div>;
}
