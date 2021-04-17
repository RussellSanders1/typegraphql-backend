import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../../../config.env';
import {User} from '../../models/User';

export const generateToken = (user: User): string => {
  return jwt.sign({
    id: user.id,
    email: user.email,
  }, SECRET_KEY, {expiresIn: '1h'});
};