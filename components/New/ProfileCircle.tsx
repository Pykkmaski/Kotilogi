type ProfileCircleProps = {
  email: string;
  onClick: (e: TODO) => void;
};

export function ProfileCircle({ email, onClick }: ProfileCircleProps) {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer flex items-center justify-center rounded-full aspect-square p-4 bg-secondary shadow-lg text-white w-16 h-16 font-semibold text-lg'>
      {email.slice(0, 2).toUpperCase()}
    </div>
  );
}
