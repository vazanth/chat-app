import { I_PAYLOAD } from '../../interfaces';
import { T_REGISTER } from '../../types/register';
import { register_api } from '../../api/register';

const register = (_:any, args: I_PAYLOAD<T_REGISTER>) => {
  return register_api(args);
}

export default {
  Mutation:{
    register
  }
}