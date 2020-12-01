import { T_REGISTER } from '../types/register';
import { T_QUERY_FIELDS } from '../types';
import { I_Mysql } from '../interfaces';

export const M_ADD_USER = (values: T_REGISTER): I_Mysql => {
  return{
    sql: 'INSERT INTO user(first_name, last_name, user_name, email, password, gender ) VALUES(?,?,?,?,?,?)',
    values: [values?.first_name, values?.last_name, values?.user_name, values?.email, values?.password, values?.gender]
  }
}

export const M_GET_USER = (user_name: string, fields: T_QUERY_FIELDS): I_Mysql => {
  return{
    sql: `SELECT ${fields} from user WHERE user_name=?`,
    values: [user_name]
  }
}