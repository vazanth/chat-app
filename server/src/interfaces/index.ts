export interface I_Mysql {
  sql: string;
  values?: any[];
}

export interface I_PAYLOAD<payload>{
  payload_input: payload
}

export interface I_FILTER<filter>{
  filter: filter
}

export interface I_FILTER_USER<filter, filter_cur_user>{
  filter: filter
  filter_cur_user: filter_cur_user
}

export interface I_FILTER_MSG<filter, conversation>{
  filter: filter
  conversation: conversation
}

export interface I_TOKEN{
  token: string
}

export interface I_SQL_CLAUSE{
  where: string | number;
  values: any[];
}