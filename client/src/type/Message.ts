import { ACTION_TYPES, I_ACTION } from './ActionTypes';

export type T_DISPATCH = (action: I_ADD_MESSAGE | I_SET_USER_MESSAGE) => void

export interface I_ADD_MESSAGE extends I_ACTION {
  type: ACTION_TYPES.ADD_MESSAGE,
  payload: T_PAYLOAD_ADD
}

export interface I_SET_USER_MESSAGE extends I_ACTION {
  type: ACTION_TYPES.SET_USER_MESSAGES,
  payload: T_PAYLOAD_SET
}

export type T_PAYLOAD_SET = {
  userId: string | undefined, 
  message: I_MESSAGE[]
}

export type T_PAYLOAD_ADD = {
  userId: string | undefined, 
  message: I_MESSAGE
}

export type T_STATE = {
  userMessages: T_PAYLOAD_SET | undefined,
  messages: T_PAYLOAD_ADD | undefined
}

export interface I_MESSAGE {
  msgId: string,
  msgData: string,
  timeStamp: string
}