import React, { createContext, useContext, useReducer} from 'react';
//type
import { T_DISPATCH, T_STATE } from '../type/User';
//interface
import { I_PROVIDER_PROPS } from '../interface';
//reducer
import userReducer from '../reducer/UserReducer';

const initialState = {userList: 
  [{ user_id: '', first_name: '', last_name: '', user_name:'' , message: {
  msg_id: '', sender_id: '', sender: '', msg: '', created_at: ''}}],
  recentUser: ''
};

const UserStateContext = createContext<T_STATE>(initialState);
const UserDispatchContext = createContext<T_DISPATCH | undefined>(undefined);

const UserProvider = ({children}: I_PROVIDER_PROPS) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return(
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  const context = useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

export {UserProvider, useUserState, useUserDispatch}
