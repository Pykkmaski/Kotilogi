import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { Notification } from '@/components/UI/Notification';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { Build, FormatPaint, House, MoreHoriz } from '@mui/icons-material';
import { RadioButtonProvider } from '@/components/Feature/RadioGroup/RadioButtonProvider';
import { BigButton } from '@/components/Feature/RadioGroup/BigButton';

function EventTypeButton({ eventType }) {
  const { refs, eventData, updateEventData } = useEventFormContext();
  const selected = eventData.event_type_id == eventType.id;

  const iconStyle = {
    fontSize: '4rem',
    color: selected ? 'white' : 'gray',
  };

  const Title = ({ children }) => {
    const className = ['text-lg font-semibold mb-4', selected ? 'text-white' : 'text-gray'].join(
      ' '
    );
    return <h1 className={className}>{children}</h1>;
  };

  const Description = ({ children }) => {
    const className = ['text-base text-center', selected ? 'text-white' : 'text-gray'].join(' ');
    return <p className={className}>{children}</p>;
  };

  const content =
    eventType.id == getIdByLabel(refs.eventTypes, 'Peruskorjaus') ? (
      <>
        <House sx={iconStyle} />
        <Title>Peruskorjaus</Title>
        <Description>
          Peruskorjauksessa voidaan esimerkiksi uusia rakennusta, rakennuksen osia, taloteknisiä
          järjestelmiä tai laitteita. Peruskorjauksen tavoitteena on saattaa rakennus
          samantasoiseksi kuin se oli uutena.
        </Description>
      </>
    ) : eventType.id == getIdByLabel(refs.eventTypes, 'Huoltotyö') ? (
      <>
        <Build sx={iconStyle} />
        <Title>Huoltotyö</Title>
        <Description>
          Korjasitko järjestelmästä vain osan tekemättä laajempaa korjaustyötä? Tämä luokitellaan
          huoltotyöksi.
        </Description>
      </>
    ) : eventType.id == getIdByLabel(refs.eventTypes, 'Pintaremontti') ? (
      <>
        <FormatPaint sx={iconStyle} />
        <Title>Pintaremontti</Title>
        <Description>Tähän kuuluvat tapetoinnit, maalaukset tai lattian vaihdot.</Description>
      </>
    ) : eventType.id == getIdByLabel(refs.eventTypes, 'Muu') ? (
      <>
        <MoreHoriz sx={iconStyle} />
        <Title>Muu</Title>
        <Description>Teitkö tapahtuman joka ei sovi mihinkään muuhun kategoriaan?</Description>
      </>
    ) : null;

  return (
    <BigButton
      onChange={updateEventData}
      value={eventType.id}
      name='event_type_id'
      checked={eventData.event_type_id == eventType.id}>
      {content}
    </BigButton>
  );
}

export const EventTypeSelector = () => {
  const { refs } = useEventFormContext();

  return (
    <div className='flex w-full justify-center'>
      <div className='lg:grid lg:grid-cols-2 xs:flex xs:flex-col w-full gap-4'>
        {refs.eventTypes.map(t => {
          return <EventTypeButton eventType={t} />;
        })}
      </div>
    </div>
  );
};
