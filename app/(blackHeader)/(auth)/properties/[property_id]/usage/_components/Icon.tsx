type IconProps = {
  type: Kotidok.UsageTypeType | 'all';
};

export function Icon({ type }: IconProps) {
  const getIcon = () => {
    if (type === 'heat') {
      return 'fa fa-fire text-white';
    } else if (type === 'water') {
      return 'fa fa-tint text-white';
    } else {
      return 'fa fa-bolt text-black';
    }
  };

  return (
    <div className={['flex p-1 rounded-md w-[25px]', `bg-${type}`].join(' ')}>
      <i className={`${getIcon()} text-lg text-center w-full`} />
    </div>
  );
}
