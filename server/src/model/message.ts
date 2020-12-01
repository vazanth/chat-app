import { T_CREATE_MESSAGE, T_GET_MESSAGE, T_CONVERSATION }from '../types/message';
import { I_Mysql, I_SQL_CLAUSE } from '../interfaces';
import { T_QUERY_FIELDS } from '../types';

export const M_GET_MESSAGE = (filter: T_GET_MESSAGE, conversation: T_CONVERSATION ,fields: T_QUERY_FIELDS) : I_Mysql => {
  let conditions: I_SQL_CLAUSE = {where: '', values: []};
  if(filter || conversation){
    conditions = buildCondition(filter, conversation);
  }
  return{
    sql: filter || conversation ? `SELECT ${fields} from message WHERE ` + conditions.where + 'order by created_at asc'
    : `SELECT ${fields} from message`,
    ...filter || conversation ? {values: conditions.values}: null
  }
}

export const M_CREATE_MESSAGE = (values: T_CREATE_MESSAGE): I_Mysql => {
  return{
    sql: 'INSERT INTO message(sender, sender_id ,receiver, receiver_id , msg, created_at) VALUES(?,?,?,?,?,?)' ,
    values: [values?.sender, values?.sender_id, values?.receiver, values?.receiver_id , values?.msg, values?.created_at]
  }
}

const buildCondition = (params: any, conversation:T_CONVERSATION) => {
  let condition = [];
  let values = [];
  if(params && typeof params.sender !==undefined && params.sender){
    condition.push('sender = ?');
    values.push(params.sender);
  }
  if(params && typeof params.receiver !==undefined && params.receiver){
    condition.push('receiver = ?');
    values.push(params.receiver);
  }
  if(params && typeof params.msg_id !==undefined && params.msg_id){
    condition.push('msg_id = ?');
    values.push(params.msg_id);
  }
  if(params && typeof params ==="number"){
    condition.push('msg_id = ? ');
    values.push(params);
  }
  if(conversation && conversation?.sender_id){
    let senderIn: string[] = [];
    condition.push('sender_id in (?) ');
    senderIn.push(conversation?.sender_id);
    senderIn.push(conversation?.receiver_id);
    values.push(senderIn);
  }
  if(conversation && conversation?.receiver_id){
    let receiverIn: string[] = [];
    condition.push('receiver_id in (?) ');
    receiverIn.push(conversation?.receiver_id);
    receiverIn.push(conversation?.sender_id);
    values.push(receiverIn);
  }
  return {
    where : condition.length > 0 ? condition.join(' AND '): 1,
    values: values
  }
}