'use client';
import MenuIcon from '@mui/icons-material/Menu';

type CardMenuButtonProps = React.ComponentProps<'div'>;
export function CardMenuButton({ onClick }: CardMenuButtonProps) {
  return (
    <div
      className='cursor-pointer hover:bg-primary'
      onClick={onClick}>
      <MenuIcon sx={{ color: 'white' }} />
    </div>
  );
}
