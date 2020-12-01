import { ACTION_TYPES, I_ACTION } from './ActionTypes';

export type T_DISPATCH = (action: I_USER_LIST_ACTION | I_REC_USER_ACTION) => void

export interface I_USER_LIST_ACTION extends I_ACTION {
  type: ACTION_TYPES.USER_LIST
  payload?: T_PAYLOAD[] 
}

export interface I_REC_USER_ACTION extends I_ACTION {
  type: ACTION_TYPES.SELECTED_USER
  payload?: string
}

export type T_STATE = {
  userList: T_PAYLOAD[] | undefined,
  recentUser: string | undefined
}

export type T_PAYLOAD = {
  user_id: string,
  user_name: string,
  first_name: string,
  last_name: string,
  message: I_Message
}

export interface I_Message  {
  msg_id: string,
  sender_id: string,
  sender: string,
  msg: string,
  created_at: string,
}