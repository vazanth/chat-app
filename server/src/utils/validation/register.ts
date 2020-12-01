import { T_REGISTER } from '../../types/register';

export const validateRegisterInput = (payload: T_REGISTER) => {
  let errors:T_REGISTER= {
    first_name: '',
    last_name: '',
    email: '',
    user_name: '',
    password: '',
    confirm_password: '',
    gender: ''
  };
  if(!payload.first_name.trim()){
    errors.first_name= 'First Name cannot be Empty'
  }
  if(!payload.last_name.trim()){
    errors.last_name= 'Last Name cannot be Empty'
  }
  if(!payload.gender.trim()){
    errors.gender= 'Last Name cannot be Empty'
  }
  if(!payload.email.trim()){
    errors.email= 'Email cannot be empty'
  }else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(payload.email))){
    errors.email= 'Not a valid Email'
  }
  if(!payload.password.trim()){
    errors.password= 'Password cannot be empty'
  }else if(payload.password !== payload.confirm_password){
    errors.password= 'Password not matching'
  }
  return{
    errors,
    valid: Object.values(errors).map(data => data === '')
  }
}