import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUser($filter: in_user_filter, $filter_cur_user: ID){
    getUser(filter: $filter, filter_cur_user: $filter_cur_user){
      user_id
      first_name
      last_name
      user_name
      avatar
      message{
        msg_id
        sender_id
        sender
        msg
        created_at
      }
    }
  }
`

export const GET_MESSAGES = gql`
  query getMessage($filter: in_message_filter, $conversation: in_msg_conversation){
    getMessage(filter: $filter, conversation: $conversation){
      msg_id
      sender
      created_at
      receiver
      msg
    }
  }
`

export const CREATE_MESSAGE = gql `
  mutation createMessage($payload_input: in_message){
    createMessage(payload_input: $payload_input){
      msg_id
      msg
      created_at
    }
  }
`