//type
import { I_USER_LIST_ACTION , I_REC_USER_ACTION, T_STATE } from '../type/User';
import { ACTION_TYPES } from '../type/ActionTypes';

type T_ACTION = I_USER_LIST_ACTION | I_REC_USER_ACTION

const userReducer = (state: T_STATE, action: T_ACTION): T_STATE => {
  switch(action?.type){
    case ACTION_TYPES.USER_LIST:{
      return{
        ...state,
        userList: action?.payload
      }
    }
    case ACTION_TYPES.SELECTED_USER:{
      return{
        ...state,
        recentUser: action?.payload
      }
    }
    default:{
      throw new Error(`Unknown action type ${action}`)
    }
  }
}

export default userReducer