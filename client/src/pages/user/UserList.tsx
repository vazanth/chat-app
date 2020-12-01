import React, { Fragment, useState } from 'react';
//@chakra-ui
import { Box, Avatar } from "@chakra-ui/core";
//components
import Spinner from '../../components/Spinner';
import AlertDialogComponent from '../../components/Alert';
//types
import { ACTION_TYPES } from '../../type/ActionTypes';
//api
import { GET_USERS } from './graphqlUser';
import { ApolloError, useQuery } from '@apollo/client';
//store
import { useAuthState } from '../../context/Auth';
import { useUserDispatch, useUserState } from '../../context/User';

const UserList = () => {
  //state
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState('');
  //store
  const { userInfo } = useAuthState();
  const { userList } = useUserState();
  const dispatch = useUserDispatch();
  //graphql api
  const {loading} = useQuery(GET_USERS, {
    variables:{filter_cur_user: userInfo?.user_id},
    onCompleted: (data) => {
      dispatch({type: ACTION_TYPES?.USER_LIST, payload: data?.getUser});
      if(data?.getUser.length > 0){
        dispatch({type: ACTION_TYPES?.SELECTED_USER, payload: data?.getUser[0].user_id});
      }else{
        dispatch({type: ACTION_TYPES?.SELECTED_USER, payload: ''});
      }
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

  if(loading) <Spinner />

  const viewUserConversation = (selUserId: string): void => {
    dispatch({type: ACTION_TYPES?.SELECTED_USER, payload: selUserId});
  }

  //for alert msg close
  const closeHandler = () => setAlertOpen(false);

  return(
    <Fragment>
      {alertOpen ? <AlertDialogComponent message={errors} close={closeHandler}/>: null}
      {
        userList && userList.map((result:any) => {
          return(
            <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" style={{cursor: 'pointer'}}
              key={result?.msg_id} onClick={()=>viewUserConversation(result?.user_id)} >
              <Box d="flex" alignItems="center" p={3}>
                <Avatar src={`data:image/png;base64, ${result?.avatar}`} mr="3"/>
                <Box flexDirection="column">
                  <Box className="userName">{result?.first_name+" "+result?.last_name}</Box>
                  <Box className="recMsg">{result?.message?.msg}</Box>
                </Box>
              </Box>
            </Box>
          )
        })
      }
    </Fragment>
  )
}

export default UserList