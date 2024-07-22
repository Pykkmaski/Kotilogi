import { getUtilityTypeLabel, UtilityType } from 'kotilogi-app/models/enums/UtilityType';

type IconProps = {
  type: UtilityType;
};

export function Icon({ type }: IconProps) {
  const getIcon = () => {
    if (type == UtilityType.HEAT) {
      return 'fa fa-fire text-white';
    } else if (type == UtilityType.WATER) {
      return 'fa fa-tint text-white';
    } else {
      return 'fa fa-bolt text-black';
    }
  };

  return (
    <div className={['flex p-1 rounded-md w-[25px]', `bg-${getUtilityTypeLabel(type)}`].join(' ')}>
      <i className={`${getIcon()} text-lg text-center w-full`} />
    </div>
  );
}
