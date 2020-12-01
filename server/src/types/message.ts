export type T_CREATE_MESSAGE = {
  sender:  string,
  sender_id: number,
  receiver: string,
  receiver_id: number,
  msg: string,
  created_at: string
}

export type T_GET_MESSAGE = {
  msg_id: number,
  sender: string,
  receiver: string
}

export type T_CONVERSATION = {
  sender_id: string,
  receiver_id: string
} | null