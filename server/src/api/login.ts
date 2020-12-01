import { UserInputError, ApolloError, AuthenticationError } from 'apollo-server';
import { T_LOGIN } from '../types/login';
import { I_PAYLOAD } from '../interfaces';
import { M_GET_USER } from '../model/register';
import { validateLoginInput } from '../utils/validation/login';
import { SECRET_KEY } from '../config/server';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { queryExecute } from '../services/database';

export const login_api = async (body: I_PAYLOAD<T_LOGIN>) => {
  let { valid, errors } = validateLoginInput(body?.payload_input);
  if(valid.includes(false)){
    throw new UserInputError('Errors', {errors});
  }
  try {
    let [userData] = await queryExecute(M_GET_USER(body?.payload_input.user_name, ['*']));
    if(!userData){
      throw new UserInputError("User doesn't exist");
    }
    let validPassword = await bcrypt.compare(body?.payload_input.password, userData.password);
    if(!validPassword){
      throw new AuthenticationError('Password is incorrect');
    }
    const token = sign({
      email: userData.email
    }, SECRET_KEY, {expiresIn:'6h'});
    return {
      status: 'Login SuccessFull',
      token,
      payload: {
        user_id: userData.user_id,
        user_name: userData.user_name,
        avatar: userData.avatar,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        gender: userData.gender
      }
    }
  } catch (error) {
    throw new ApolloError(error)
  }
}