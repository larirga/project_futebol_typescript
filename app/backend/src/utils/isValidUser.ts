import { LoginUser } from '../services/user.service';
import ValidateError from './validateError';

const isValidUser = ({ email, password }: LoginUser): void => {
  const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const isValidUserEmail = regex.test(email);
  const isValidUserPassword = password.length > 5;

  if (!isValidUserEmail || !isValidUserPassword) {
    throw new ValidateError('Invalid email or password');
  }
};

export default isValidUser;
