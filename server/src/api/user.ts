import { ApolloError } from 'apollo-server';
import { T_LOGIN_FILTER, T_FILTER_CUR_USER } from '../types/login';
import { T_QUERY_FIELDS } from '../types';
import { I_FILTER, I_FILTER_USER } from '../interfaces';
import { M_GET_USERS, M_GET_USER_MSG } from '../model/user';
import { queryExecute } from '../services/database';

export const get_users_api = async (body: I_FILTER<T_LOGIN_FILTER>, fields: T_QUERY_FIELDS) => {
  try {
    let userData = await queryExecute(M_GET_USERS(body?.filter, fields));
    return userData
  } catch (error) {
    throw new ApolloError(error)
  }
}

export const get_user_msg_api = async (body: I_FILTER_USER<T_LOGIN_FILTER,T_FILTER_CUR_USER>, fields: T_QUERY_FIELDS) => {
  try {
    let userData = await queryExecute(M_GET_USER_MSG(body?.filter, body?.filter_cur_user ,fields));
    let userResult = userData.map((data: any )=>{
      return{
        user_id: data?.user_id,
        user_name: data?.user_name,
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        avatar: data?.avatar,
        gender: data?.gender,
        message:{
          msg_id: data?.msg_id,
          sender: data?.sender,
          sender_id: data?.sender_id,
          receiver: data?.receiver,
          receiver_id: data?.receiver_id,
          msg: data?.msg,
          created_at: data?.created_at,
        }
      }
    })
    return userResult;
  } catch (error) {
    throw new ApolloError(error)
  }
}