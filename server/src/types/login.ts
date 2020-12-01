export type T_LOGIN = {
  user_name: string,
  password: string
}

export type T_RES_LOGIN = {
  status: string,
  token: string,
  payload: T_USER
}

export type T_USER = {
  user_id: number,
  name: string,
  first_name: string,
  last_name: string,
  email: string
}

export type T_FILTER_CUR_USER = number

export type T_LOGIN_FILTER = {
  user_id: number,
  user_name: string,
  email: string
}