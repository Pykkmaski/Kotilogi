export const useRegister = jest.fn(() => ({
  registerHandler: jest.fn(),
  data: {},
  updateData: jest.fn(),
  status: 'idle',
}));
