import { UserInputError, ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { I_PAYLOAD } from '../interfaces';
import { T_REGISTER } from '../types/register';
import { M_ADD_USER, M_GET_USER } from '../model/register';

import { queryExecute } from '../services/database';
import { validateRegisterInput } from '../utils/validation/register'; 

export const register_api = async(body: I_PAYLOAD<T_REGISTER>)=> {
  try {
    let { valid, errors } = validateRegisterInput(body?.payload_input);
    if(valid.includes(false)){
      throw new UserInputError('Errors',errors)
    }
    let [userExist] = await queryExecute(M_GET_USER(body?.payload_input.user_name, ['user_name']));
    if(userExist && userExist.length!==0){
      throw new UserInputError('User already exist')
    }
    let password = await bcrypt.hash(body?.payload_input.password,12);
    body.payload_input.password = password;
    let result = await queryExecute(M_ADD_USER(body?.payload_input));
    return {
      status: `User Created Successfully`,
      id: result.insertId
    } 
  } catch (error) {
    throw new ApolloError(error)
  }
}