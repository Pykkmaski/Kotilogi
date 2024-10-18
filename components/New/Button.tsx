import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import Spinner from '../UI/Spinner';
import { RenderOnCondition } from '../Util/RenderOnCondition';

export type ButtonProps = MuiButtonProps & {
  /**Displays a loading spinner as the start icon, if set to true. */
  loading?: boolean;
};

export function Button({ children, loading = false, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      startIcon={
        <RenderOnCondition
          condition={!loading}
          fallback={<Spinner />}>
          {props.startIcon}
        </RenderOnCondition>
      }
      sx={props.variant == 'contained' && { color: 'white' }}>
      {children}
    </MuiButton>
  );
}
