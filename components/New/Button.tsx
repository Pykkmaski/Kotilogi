import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type ButtonProps = MuiButtonProps;
export function Button({ children, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      sx={props.variant == 'contained' && { color: 'white' }}>
      {children}
    </MuiButton>
  );
}
