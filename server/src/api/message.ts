import { UserInputError, ApolloError } from 'apollo-server';
import { I_PAYLOAD, I_FILTER_MSG } from '../interfaces';
import { T_QUERY_FIELDS } from '../types';
import { T_CREATE_MESSAGE, T_GET_MESSAGE, T_CONVERSATION }from '../types/message';

import { queryExecute } from '../services/database';
import { M_GET_MESSAGE, M_CREATE_MESSAGE } from '../model/message';
import { M_GET_USER } from '../model/register';

export const get_message_api = async(body: I_FILTER_MSG<T_GET_MESSAGE, T_CONVERSATION>, fields: T_QUERY_FIELDS) => {
  try {
    let message = await queryExecute(M_GET_MESSAGE(body?.filter, body?.conversation ,fields));
    return message
  } catch (error) {
    throw new ApolloError(error);
  }
}

export const create_message_api = async(body: I_PAYLOAD<T_CREATE_MESSAGE>) => {
  try {
    let [receiverExist] = await queryExecute(M_GET_USER(body?.payload_input.receiver, ['user_name']));
    let [senderExist] = await queryExecute(M_GET_USER(body?.payload_input.sender, ['user_name']));
    if(!receiverExist){
      throw new UserInputError('Receiver does not exist')
    }
    if(!senderExist){
      throw new UserInputError('Sender does not exist')
    }
    if(receiverExist && receiverExist?.from === body?.payload_input?.sender){
      throw new UserInputError('Cannot send a Message to yourself');
    }
    if (body?.payload_input?.msg.trim() === '') {
      throw new UserInputError('Message is empty')
    }
    let result = await queryExecute(M_CREATE_MESSAGE(body?.payload_input));
    if(result){
      let [message] = await queryExecute(M_GET_MESSAGE(result?.insertId, null ,['*']));
      return{
        msg_id: message?.msg_id,
        sender: message?.sender,
        receiver: message?.receiver,
        sender_id: message?.sender_id,
        receiver_id: message?.receiver_id,
        msg: message?.msg,
        created_at: message?.created_at
      }
    }
  } catch (error) {
    throw new ApolloError(error);
  }
}