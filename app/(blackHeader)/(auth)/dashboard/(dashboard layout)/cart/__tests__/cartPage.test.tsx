import { getServerSession } from 'next-auth';
import Page from '../page';
import { render } from '@testing-library/react';
import { getBills } from '../_actions/getBills';

jest.mock('next-auth');
jest.mock('../_actions/getBills');

const testUser = {
  email: 'test@email.com',
};

test('Gets the session, and due bills of the user.', async () => {
  (getServerSession as jest.Mock).mockResolvedValueOnce({ user: testUser });
  render(<Page />);
  expect(getServerSession).toHaveBeenCalled();
  expect(getBills).toHaveBeenCalledWith({ user: testUser }, 1);
});
