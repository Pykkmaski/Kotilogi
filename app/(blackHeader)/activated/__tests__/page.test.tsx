import { render, screen } from '@testing-library/react';
import Page from '../page';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    update: jest.fn().mockResolvedValue(null),
  }),
}));

describe('Testing the activated page.', () => {
  const testEmail = 'test@email.com';

  beforeAll(() => {
    render(<Page searchParams={{ email: testEmail }} />);
  });

  it('Calls updateSession setting the users status to 1', () => {
    const { update } = useSession();
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 1,
      })
    );
  });
});
