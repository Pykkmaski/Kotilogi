export const useLogin = jest.fn(() => ({
  loginHandler: jest.fn(),
  updateData: jest.fn(),
  status: 'idle',
}));
