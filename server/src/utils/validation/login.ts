import { T_LOGIN } from '../../types/login';

export const validateLoginInput = (payload: T_LOGIN) => {
  let errors:T_LOGIN= {
    user_name: '',
    password: ''
  };
  if(!payload.user_name.trim()){
    errors.user_name= 'User Name cannot be Empty'
  }
  if(!payload.password.trim()){
    errors.password= 'Password cannot be empty'
  }
  return{
    errors,
    valid: Object.values(errors).map(data => data === '')
  }
}