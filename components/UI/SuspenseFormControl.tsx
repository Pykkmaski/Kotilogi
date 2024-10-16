import { ChipRadioGroup } from '../Feature/RadioGroup/ChipRadioGroup';
import { FormControl, FormControlProps } from './FormUtils';
import Spinner from './Spinner';

type SuspenseFormControlProps = FormControlProps & {
  isLoading: boolean;
  error?: boolean;
};

/**A FormControl that displays a spinner in place of its content, if the isLoading-prop is set. */
export function SuspenseFormControl({ isLoading, error, ...props }: SuspenseFormControlProps) {
  return isLoading ? <Spinner message='Ladataan pintoja...' /> : <FormControl {...props} />;
}
