import { parseResolveInfo, simplifyParsedResolveInfoFragmentWithType  } from 'graphql-parse-resolve-info';
import { T_LOGIN_FILTER, T_FILTER_CUR_USER } from '../../types/login';
import { T_QUERY_FIELDS } from '../../types';
import { I_FILTER_USER, I_TOKEN } from '../../interfaces';
import { get_users_api, get_user_msg_api } from '../../api/user';
import { token_api } from '../../api/token';

const getUser = (_:any, args:I_FILTER_USER<T_LOGIN_FILTER,T_FILTER_CUR_USER>, context: I_TOKEN, info:any) => {
  const parsedResolveInfoFragment:any = parseResolveInfo(info);
  const {fields}  = simplifyParsedResolveInfoFragmentWithType(parsedResolveInfoFragment, info.returnType);
  const queryFields: T_QUERY_FIELDS = Object.keys(fields).map(data => data);
  let Auth = token_api(context?.token);
  if(Auth){
    return queryFields.includes('message') ? get_user_msg_api(args, queryFields) :get_users_api(args, queryFields);
  }
}

export default {
  Message:{
    created_at: (parent:any) => parent.created_at.toISOString()
  },
  Query:{
    getUser
  }
}