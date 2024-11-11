import { useEventDetailsContext } from './EventDetails';

export const HormiContent = () => {
  const { mainData } = useEventDetailsContext();
  console.log(mainData);
  return null;
};
