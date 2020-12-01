import React, { Fragment, useState, useEffect } from 'react';
//@chakra-ui
import { Box, Input, InputRightElement , InputGroup } from "@chakra-ui/core";
//icons
import { FaPaperPlane } from "react-icons/fa"
//components
import Spinner from '../../components/Spinner';
import AlertDialogComponent from '../../components/Alert';
//util
import moment from 'moment';
//types
import { ACTION_TYPES } from '../../type/ActionTypes';
import { T_PAYLOAD_ADD, T_PAYLOAD_SET } from '../../type/Message';
//api
import { GET_MESSAGES, CREATE_MESSAGE } from './graphqlUser';
import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
//store
import { useAuthState } from '../../context/Auth';
import { useUserState } from '../../context/User';
import { useMessageDispatch, useMessageState } from '../../context/Message';

const UserConversation = () => {
  //state
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState('');
  const [message,setMessage] = useState('');
  //store
  const { userInfo } = useAuthState();
  const { recentUser, userList } = useUserState();
  const dispatch = useMessageDispatch();
  const { userMessages } = useMessageState();
  console.log('userMessages', userMessages)
  //graphql api
  const [getMessages,{data, loading}] = useLazyQuery(GET_MESSAGES, {
    variables:{conversation: {
      sender_id: userInfo?.user_id,
      receiver_id: recentUser
    }},
    onCompleted: (data) => {
      let conversation: T_PAYLOAD_SET = {
        userId: recentUser,
        message: data?.getMessage
      }
      dispatch({type: ACTION_TYPES?.SET_USER_MESSAGES, payload: conversation})
    },
    onError: (err: ApolloError | undefined) => {
      setAlertOpen(true);
      if(err?.message){
        setErrors(err?.message);
      }else{
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      } 
    },
  })
  //graphql api
  // const [createMessage, {loading: loader}] = useMutation(CREATE_MESSAGE, {
  //   onCompleted: (data) => {
  //     console.log('data', data)
  //     let conversation: T_PAYLOAD_ADD = {
  //       userId: recentUser,
  //       message: data?.message
  //     }
  //     dispatch({type: ACTION_TYPES?.ADD_MESSAGE, payload: conversation})
  //   },
  //   onError: (err: ApolloError | undefined) => {
  //     setAlertOpen(true);
  //     if(err?.message){
  //       setErrors(err?.message);
  //     }else{
  //       setErrors(err?.graphQLErrors[0]?.extensions?.errors);
  //     }
      
  //   },
  // })

  useEffect(()=>{
    if(recentUser){
      getMessages()
    }
  },[recentUser, getMessages])

  if(loading) <Spinner />
  // if(loader) <Spinner />

  const msgMarkupAlign = (sender: string): boolean => {
    if(userInfo?.user_name.toLowerCase() === sender.toLowerCase()){
      return true
    }else{
      return false
    }
  }

  const sendMessage = () => {
    let receiver = userList?.filter(data=> data?.user_id ===recentUser)[0];
    // createMessage({variables: {payload_input:{
    //   sender: userInfo?.user_name,
    //   sender_id: userInfo?.user_id,
    //   receiver: receiver?.user_name,
    //   receiver_id: receiver?.user_id,
    //   msg: message,
    //   created_at: moment(new Date()).format('YYYY-MM-DD H:mm:ss')
    // }}})
    let conversation: T_PAYLOAD_ADD = {
      userId: recentUser,
      message: {
        msgId: '3',
        msgData: 'Sowhen do i start',
        timeStamp: ''
      }
    }
    dispatch({type: ACTION_TYPES?.ADD_MESSAGE, payload: conversation})
  }

  const closeHandler = () => setAlertOpen(false);

  return(
    <Fragment>
      {alertOpen ? <AlertDialogComponent message={errors} close={closeHandler}/>: null}
      <div className="msgArea">
      <div className="scrollableArea">
      {
        data && data?.getMessage.map((result: any)=> {
          return(
            <Box d="flex" justifyContent={msgMarkupAlign(result?.sender) ? "flex-end": "flex-start"} mb={2}>
              <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" 
                borderRadius="lg" bg={msgMarkupAlign(result?.sender) ? "blue.500": "#A0AEC0"} 
                color={msgMarkupAlign(result?.sender) ? "white": "black"}>
                <Box d="flex" alignItems="center" p={2}>
                  {result?.msg}
                </Box>
              </Box>
            </Box>
          )
        })
      }
      </div>
      <Box m="2">
        <InputGroup size="lg">
          <Input placeholder="Type away...." isFullWidth={true} onChange={(e:any)=>setMessage(e.target.value)}/>
          <InputRightElement children={
            <Box as={FaPaperPlane} onClick={sendMessage} className={message ? `enableSend`: `disableSend`} />
          } />
        </InputGroup>
      </Box>
      </div>
    </Fragment>
  )
}

export default UserConversation