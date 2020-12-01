import { gql } from '@apollo/client';

export const REGISTER_USER = gql `
  mutation register($payload_input: in_register){
    register(payload_input: $payload_input){
      status
      id
      error
    }
  }
`

export const LOGIN = gql `
  query login($payload_input: in_login!){
    login(payload_input: $payload_input){
      status
      token
      payload{
        user_id
        user_name
        avatar
        first_name
        last_name
        avatar
      }
    }
  }
`