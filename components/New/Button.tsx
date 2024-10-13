import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import Spinner from '../UI/Spinner';

type ButtonProps = MuiButtonProps & {
  /**Displays a loading spinner as the start icon, if set to true. */
  loading?: boolean;
};

export function Button({ children, loading = false, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      startIcon={loading == true ? <Spinner size='1rem' /> : props.startIcon}
      sx={props.variant == 'contained' && { color: 'white' }}>
      {children}
    </MuiButton>
  );
}
