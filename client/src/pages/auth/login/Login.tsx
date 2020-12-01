import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { T_LOGIN } from '../../../type/Auth';
//components
import ThemeToggler from '../../../components/ThemeToggler';
//child components
import LoginForm from './LoginForm';
import Spinner from '../../../components/Spinner';
import AlertDialogComponent from '../../../components/Alert';
//api
import { LOGIN } from '../graphqlAuth';
import { ApolloError, useLazyQuery } from '@apollo/client';
//types
import { ACTION_TYPES } from '../../../type/ActionTypes';
//store
import { useAuthDispatch } from '../../../context/Auth';

const Login = () => {
  let history = useHistory();
  const dispatch = useAuthDispatch();
  //state
  const [spinner, setSpinner] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState('');

  //graphql api
  const [login, {loading}] = useLazyQuery(LOGIN, {
    variables:{...{payload_input:loginData}},
    onCompleted: (result) => {
      if(result?.error){
        setErrors(result?.data?.error[0].message);
        setAlertOpen(true);
      }else{
        dispatch({type: ACTION_TYPES.LOGIN, payload: result?.login?.payload});
        sessionStorage.setItem('token', result?.login?.token);
        history.push('/home');
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
  const handleSubmit = (data: T_LOGIN) => {
    setLoginData(data);
    try {
      setSpinner(true);
      login();
      setSpinner(false);
    } catch (error) {
      console.log('error', error);
      setSpinner(false);
    }
  }

  if(loading) <Spinner />

  const closeHandler = () => setAlertOpen(false);

  return(
    <Fragment>
      <ThemeToggler />
      {alertOpen ? <AlertDialogComponent message={errors} close={closeHandler}/>: null}
      <LoginForm onSubmit={handleSubmit} spinner={spinner} />
    </Fragment>
  )
}

export default Login