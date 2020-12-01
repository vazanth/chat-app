import { T_LOGIN } from '../../types/login';
import { I_PAYLOAD, I_FILTER, I_TOKEN } from '../../interfaces';
import { login_api } from '../../api/login';

const login = (_:any,args:I_PAYLOAD<T_LOGIN>) => {
  return login_api(args);
}

export default {
  Query:{
    login,
  }
}