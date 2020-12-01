import { T_LOGIN_FILTER, T_FILTER_CUR_USER } from '../types/login';
import { I_Mysql, I_SQL_CLAUSE } from '../interfaces';
import { T_QUERY_FIELDS } from '../types';

export const M_GET_USERS = (filter: T_LOGIN_FILTER, fields: T_QUERY_FIELDS): I_Mysql => {
  let conditions: I_SQL_CLAUSE = {where: '', values: []}
  if(filter){
    conditions = buildCondition(filter);
  }
  return{
    sql: filter ? `SELECT ${fields} from user WHERE ` + conditions.where: `SELECT ${fields} from user`,
    ...filter ? {values: conditions.values}: null
  }
}

export const M_GET_USER_MSG = (filter: T_LOGIN_FILTER, filter_cur_user: T_FILTER_CUR_USER , fields: T_QUERY_FIELDS): I_Mysql => {
  let conditions: I_SQL_CLAUSE = {where: '', values: []};

  if(filter){
    conditions = buildCondition(filter);
  }

  if(filter_cur_user){
    conditions.values.unshift(filter_cur_user);
  }  
  return{
    sql: filter ? `SELECT ${columnFields(fields)} from user INNER JOIN message on message.sender_id=user.user_id 
    where message.created_at in (select max(created_at) from message group by sender) AND ` + conditions.where + ` order by created_at desc`
    : `SELECT ${columnFields(fields)} from user INNER JOIN message on message.sender_id=user.user_id 
    where message.created_at in (select max(created_at) from message group by sender) AND ${filter_cur_user? 'receiver_id = ?': ''} order by created_at desc`,
    ...filter || filter_cur_user ? {values: conditions.values}: null
  }
}

const columnFields = (fields: T_QUERY_FIELDS) => {
  if(fields.includes('message')){
    let newFields: T_QUERY_FIELDS = [];
    (newFields = fields.filter(data => data!=='message')).push('msg_id', 'receiver', 'sender', 'sender_id', 'msg', 'created_at');
    return newFields;
  }else{
    return fields
  }
}

const buildCondition = (params: any) => {
  let condition = [];
  let values = [];
  if(params && typeof params.user_id !==undefined && params.user_id){
    condition.push('user_id = ?');
    values.push(parseInt(params.user_id));
  }
  if(params && typeof params.user_name !==undefined && params.user_name){
    condition.push('user_name = ?');
    values.push(params.user_name);
  }
  if(params && typeof params.email !==undefined && params.email){
    condition.push('email = ?');
    values.push(params.email);
  }
  return {
    where : condition.length > 0 ? condition.join(' AND '): 1,
    values: values
  }
}


/**
 * select concat(first_name,' ' ,last_name) as name, msg, created_at, avatar from user INNER JOIN message on message.sender_id=user.user_id 
where message.created_at in (select max(created_at)  from message group by sender);
 */