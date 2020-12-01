export enum ACTION_TYPES{
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  USER_LIST = 'USER_LIST',
  SELECTED_USER = 'SELECTED_USER',
  SET_USER_MESSAGES = 'SET_USER_MESSAGES',
  ADD_MESSAGE = 'ADD_MESSAGE'
}

export interface I_ACTION {
  type: ACTION_TYPES
}