export type CommonError = 'none' | 'success' | 'unexpected';
export type PasswordError = 'password_mismatch';
export type RegisterError = CommonError | PasswordError | 'user_exists';
export type LoginError = CommonError | PasswordError | 'invalid_user';