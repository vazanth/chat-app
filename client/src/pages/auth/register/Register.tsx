import React, { Fragment, useState } from 'react';
import { T_Register } from '../../../type/Auth';
//components
import ThemeToggler from '../../../components/ThemeToggler';
//child components
import RegisterForm from './RegisterForm';
import Spinner from '../../../components/Spinner';
import AlertDialogComponent from '../../../components/Alert';
//api
import { REGISTER_USER } from '../graphqlAuth';
import { ApolloError, useMutation } from '@apollo/client';

const Register = () => {
  //state
  const [spinner, setSpinner] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState('');

  //graphql api
  const [registerUser, {loading}] = useMutation(REGISTER_USER, {
    variables:{...{payload_input:registerData}},
    onCompleted: (result) => {
      if(result?.register?.error){
        setErrors(result?.register?.error[0].message);
        setAlertOpen(true);
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
  const handleSubmit = (data: T_Register) => {
    setRegisterData(data);
    try {
      setSpinner(true);
      registerUser();
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
      <RegisterForm onSubmit={handleSubmit} spinner={spinner} />
    </Fragment>
  )
}

export default Register