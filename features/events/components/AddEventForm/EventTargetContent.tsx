import { useEventFormContext } from './EventFormContext';
import { Notification } from '@/components/UI/Notification';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { getEditorByEventType } from './utils/getEditorByTargetType';
import { useInvokeEditor } from './utils/useInvokeEditor';
import { EventTargetSelector } from './Selectors/EventTargetSelector';

/**Renders the content of the event form target-tab */
export function EventTargetContent() {
  const {
    eventData: { target_type, event_type },
    editing,
  } = useEventFormContext();
  const invokeEditor = useInvokeEditor();
  const Editor = getEditorByEventType(target_type, event_type);
  const content = Editor ? invokeEditor(Editor) : null;

  return event_type ? (
    <div className='flex flex-col gap-10 w-full'>
      <ChosenEventTypeNotice event_type={event_type} />
      {
        //Only show the target selector if not editing.
        !editing && <EventTargetSelector />
      }

      {content ? (
        //Display the editor for the selected target, if one exists.
        content
      ) : target_type !== undefined ? (
        //Display a notification about the target not being supported yet, if a target is selected, but does not have an editor.
        <UnsupportedTargetTypeNotice />
      ) : (
        //Otherwise display a prompt to select a target.
        <Notification position='start'>Aloita valitsemalla kohde.</Notification>
      )}
    </div>
  ) : (
    <CarouselProvider.SelectSlotTrigger slotToSelect='type'>
      <Notification
        position='start'
        variant='default'>
        Valitse ensin tapahtuman tyyppi.
      </Notification>
    </CarouselProvider.SelectSlotTrigger>
  );
}

/**Displays the chosen event type notice. */
function ChosenEventTypeNotice({ event_type }) {
  return (
    <Notification
      variant='success'
      position='start'>
      Valittu tapahtumatyyppi: <span className='font-semibold'>{event_type}</span>
    </Notification>
  );
}

/**Displays the notice about a target not being supported. */
function UnsupportedTargetTypeNotice() {
  return (
    <Notification
      variant='default'
      position='start'>
      Valitulle kohteelle ei ole vielä saatavilla tarkentavia tietoja. Ole hyvä ja jatka seuraavaan
      osioon.
    </Notification>
  );
}
