import { ChipRadioGroup } from '../Feature/RadioGroup/ChipRadioGroup';
import { FormControl, FormControlProps } from './FormUtils';
import Spinner from './Spinner';

type SuspenseFormControlProps = FormControlProps & {
  isLoading: boolean;
  error?: boolean;
  loadingText?: string;
};

/**A FormControl that displays a spinner in place of its content, if the isLoading-prop is set. */
export function SuspenseFormControl({
  isLoading,
  error,
  loadingText = 'Ladataan...',
  ...props
}: SuspenseFormControlProps) {
  return isLoading ? <Spinner message={loadingText} /> : <FormControl {...props} />;
}
