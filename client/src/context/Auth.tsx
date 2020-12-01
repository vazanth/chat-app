import React, { createContext, useContext, useReducer} from 'react';
//type
import { T_DISPATCH, T_STATE } from '../type/Auth';
//interface
import { I_PROVIDER_PROPS } from '../interface';
//reducer
import authReducer from '../reducer/AuthReducer';

const initialState = {isAuth: false, userInfo: { user_id: '', user_name: '' }};

const AuthStateContext = createContext<T_STATE>(initialState);
const AuthDispatchContext = createContext<T_DISPATCH | undefined>(undefined);

const AuthProvider = ({children}: I_PROVIDER_PROPS) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return(
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

function useAuthState() {
  const context = useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }
  return context
}

export {AuthProvider, useAuthState, useAuthDispatch}
