import { parseResolveInfo, simplifyParsedResolveInfoFragmentWithType  } from 'graphql-parse-resolve-info';
import { I_PAYLOAD, I_TOKEN, I_FILTER_MSG } from '../../interfaces';
import { T_CREATE_MESSAGE, T_GET_MESSAGE, T_CONVERSATION }from '../../types/message';
import { T_QUERY_FIELDS } from '../../types';
import { token_api } from '../../api/token';

import { create_message_api, get_message_api } from '../../api/message';

const createMessage = (_:any, args:I_PAYLOAD<T_CREATE_MESSAGE>, context: I_TOKEN) => {
  let Auth = token_api(context?.token);
  if(Auth){
    return create_message_api(args);
  }
}

const getMessage = (_:any, args:I_FILTER_MSG<T_GET_MESSAGE, T_CONVERSATION>, context: I_TOKEN, info: any) => {
  const parsedResolveInfoFragment:any = parseResolveInfo(info);
  const {fields}  = simplifyParsedResolveInfoFragmentWithType(parsedResolveInfoFragment, info.returnType);
  const queryFields: T_QUERY_FIELDS = Object.keys(fields).map(data => data);
  let Auth = token_api(context?.token);
  if(Auth){
    return get_message_api(args, queryFields);
  }
}

export default {
  Message:{
    created_at: (parent:any) => parent.created_at.toISOString()
  },
  Query:{
    getMessage
  },
  Mutation:{
    createMessage
  }
}