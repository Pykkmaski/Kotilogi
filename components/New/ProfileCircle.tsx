type ProfileCircleProps = {
  email: string;
  onClick?: (e: TODO) => void;
};

export function ProfileCircle({ email, onClick }: ProfileCircleProps) {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer flex items-center justify-center rounded-full aspect-square p-4 bg-secondary shadow-lg text-white lg:w-12 lg:h-12 xs:w-10 xs:h-10 font-semibold lg:text-base xs:text-base'>
      {email.slice(0, 2).toUpperCase()}
    </div>
  );
}
