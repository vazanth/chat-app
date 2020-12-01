//type
import { I_AUTH_ACTION, T_STATE } from '../type/Auth';
import { ACTION_TYPES } from '../type/ActionTypes';

const authReducer = (state:T_STATE, action:I_AUTH_ACTION): T_STATE => {
  switch(action?.type){
    case ACTION_TYPES.LOGIN:{
      return{
        ...state,
        isAuth: action.payload ? true: false,
        userInfo: action?.payload
      }
    }
    case ACTION_TYPES.LOGOUT:{
      return{
        ...state,
        isAuth: false
      }
    }
    default:{
      throw new Error(`Unknown action type ${action.type}`)
    }
  }
}

export default authReducer

