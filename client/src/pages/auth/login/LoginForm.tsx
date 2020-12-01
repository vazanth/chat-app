import React, { Fragment, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useForm  } from 'react-hook-form';
//@chakra-ui
import { Box, Heading, Flex, Button, FormControl, Link,
  FormLabel, Input, InputGroup, InputRightElement, Icon } from "@chakra-ui/core";
//type
import { T_LOGIN, T_LOGGED_IN } from '../../../type/Auth';

const LoginForm = (props: T_LOGGED_IN) => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm<T_LOGIN>();
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = (data: T_LOGIN) => {
    props.onSubmit(data);
  }

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const proceedToRegister = () => history.push('/register');

  return (
    <Fragment>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={16} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center" mb={3}>
            <Heading>Login</Heading>
          </Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box mb={5}>
                <FormControl>
                  <FormLabel>UserName</FormLabel>
                  <Input type="text" ref={register({required: true})} name="user_name"/>
                  {errors.user_name && <div style={{color:'red'}}>Username is Required</div>}
                </FormControl>
              </Box>
              <Box mb={5}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" :"password"} ref={register(
                      {required: true}
                      )} name="password"/>
                    <InputRightElement width="3rem">
                      <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                        {showPassword ? <Icon name="view-off" /> : <Icon name="view" />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && <div style={{color:'red'}}>Password is Required</div>}
                </FormControl>
              </Box>
              <Box textAlign="center" mt={6}>
                <Button variantColor="yellow" variant="outline" size="lg" type="submit" isLoading={props.spinner}>
                  Login
                </Button>
              </Box>
            </form>
          </Box>
          <Box mt={5} textAlign="right">
            <Link color="blue.400" onClick={proceedToRegister}>Don't have an account? Sign up</Link>
          </Box>
        </Box>
      </Flex>
    </Fragment>
  );
}

export default LoginForm;
