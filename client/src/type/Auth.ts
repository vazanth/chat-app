import { ACTION_TYPES, I_ACTION } from './ActionTypes';

export type T_Register = {
  first_name : string,
  last_name: string,
  user_name: string,
  email: string,
  password: string,
  confirm_password: string,
  gender: string
}

export type T_SUBMIT = {
  onSubmit: (data: T_Register) => void,
  spinner: boolean
}

export type T_LOGIN = {
  user_name: string,
  password: string
}

export type T_LOGGED_IN = {
  onSubmit : (data: T_LOGIN) => void,
  spinner: boolean
}

export type T_STATE = {
  isAuth: boolean | undefined
  userInfo: T_PAYLOAD | undefined
}

export interface I_AUTH_ACTION extends I_ACTION {
  type: ACTION_TYPES.LOGIN | ACTION_TYPES.LOGOUT
  payload?: T_PAYLOAD
}

export type T_PAYLOAD = {
  user_id: string,
  user_name: string,
  avatar?: string,
  first_name?: string,
  last_name?: string,
  gender?: string
  email?: string
}

export type T_DISPATCH = (action: I_AUTH_ACTION) => void