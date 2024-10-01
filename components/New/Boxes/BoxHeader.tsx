import { Spacer } from '../Spacer';

export function BoxHeader({ children }: React.PropsWithChildren) {
  return (
    <Spacer
      alignItems='center'
      width='full'>
      {children}
    </Spacer>
  );
}
