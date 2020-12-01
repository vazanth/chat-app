//type
import { I_ADD_MESSAGE, I_SET_USER_MESSAGE, T_STATE } from '../type/Message';
import { ACTION_TYPES } from '../type/ActionTypes';


const messageReducer = (state: T_STATE, action: I_ADD_MESSAGE | I_SET_USER_MESSAGE): T_STATE => {
  switch(action?.type){
    case ACTION_TYPES.SET_USER_MESSAGES:{
      return{
        ...state,
        userMessages: action?.payload
      }
    }
    case ACTION_TYPES.ADD_MESSAGE:{
      let newMessage = action?.payload;
      let copyUserMsg = Object.assign({}, state?.userMessages);
      let copyMsg = Object.assign([], copyUserMsg.message);
      copyMsg.push(newMessage?.message);
      return{
        ...state,
        messages: newMessage,
        userMessages: copyUserMsg
      }
    }
    default:{
      throw new Error(`Unknown action type ${action}`)
    }
  }
}

export default messageReducer