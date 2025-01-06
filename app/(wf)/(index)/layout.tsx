import { IndexPageProvider } from 'kotilogi-app/app/(wf)/(index)/IndexPageProvider';

/**Wraps its content in an index page provider. */
export default async function IndexLayout({ children }) {
  return <IndexPageProvider>{children}</IndexPageProvider>;
}
