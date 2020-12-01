import React, { createContext, useContext, useReducer } from 'react';
//type
import { T_DISPATCH, T_STATE } from '../type/Message';
//interface
import { I_PROVIDER_PROPS } from '../interface';
//reducer
import messageReducer from '../reducer/MessageReducer';

const initialState={ userMessages:{userId: '', message:[{
  msgId:'', msgData: '', timeStamp: ''
}]}, messages:{userId:'', message:{msgId:'', msgData:'', timeStamp:''}}}

const MessageStateContext = createContext<T_STATE>(initialState);
const MessageDispatchContext = createContext<T_DISPATCH | undefined>(undefined);

const MessageProvider = ({children}: I_PROVIDER_PROPS) => {
  const [state, dispatch] = useReducer(messageReducer,initialState);
  return(
    <MessageStateContext.Provider value={state}>
      <MessageDispatchContext.Provider value={dispatch}>
        {children}
      </MessageDispatchContext.Provider>
    </MessageStateContext.Provider>

  )
}

function useMessageState() {
  const context = useContext(MessageStateContext)
  if (context === undefined) {
    throw new Error('useMessageState must be used within a MessageProvider')
  }
  return context
}

function useMessageDispatch() {
  const context = useContext(MessageDispatchContext)
  if (context === undefined) {
    throw new Error('useMessageDispatch must be used within a MessageProvider')
  }
  return context
}

export { MessageProvider, useMessageState, useMessageDispatch }