import { Check, SquareOutlined } from '@mui/icons-material';
import { green } from 'tailwindcss/colors';
export const BooleanIcon = ({ state }: { state: boolean }) =>
  (state && <Check sx={{ color: green['400'] }} />) || <SquareOutlined />;
