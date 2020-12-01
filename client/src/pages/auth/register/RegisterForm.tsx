import React, { Fragment, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useForm  } from 'react-hook-form';
//@chakra-ui
import { Grid, Box, Heading, Flex, Button, RadioGroup, Radio, FormControl, Link,
  FormLabel, Input, InputGroup, InputRightElement, Icon } from "@chakra-ui/core";
//type
import { T_Register, T_SUBMIT } from '../../../type/Auth';

const RegisterForm = (props: T_SUBMIT) => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm<T_Register>();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })
  const onSubmit = (data: T_Register) => {
    props.onSubmit(data);
  }

  const handlePasswordVisibility = (field: string) => {
    if(field === 'confirmPassword'){
      setShowPassword({...showPassword, [field]: !showPassword.confirmPassword});
    }else{
      setShowPassword({...showPassword, [field]: !showPassword.password});
    }
  }

  const proceedToLogin = () => history.push('/login');

  return (
    <Fragment>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center" mb={3}>
            <Heading>Register</Heading>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="first_name" ref={register}/>
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="last_name" ref={register}/>
              </FormControl>
              <FormControl>
                <FormLabel>UserName</FormLabel>
                <Input type="text" ref={register({required: true})} name="user_name"/>
                {errors.user_name && <div style={{color:'red'}}>Username is Required</div>}
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="test@test.com" ref={register({required: true})} 
                name="email"/>
                  {errors.email && <div style={{color:'red'}}>Email is Required</div>}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword.password ? "text" :"password"} ref={register(
                    {required: true}
                    )} name="password"/>
                  <InputRightElement width="3rem">
                    <Button h="1.5rem" size="sm" onClick={()=>handlePasswordVisibility('password')}>
                      {showPassword.password ? <Icon name="view-off" /> : <Icon name="view" />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <div style={{color:'red'}}>Password is Required</div>}
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword.confirmPassword ? "text" :"password"} ref={register({required: true})} name="confirm_password"/>
                  <InputRightElement width="3rem">
                    <Button h="1.5rem" size="sm" onClick={()=>handlePasswordVisibility('confirmPassword')}>
                      {showPassword.confirmPassword ? <Icon name="view-off" /> : <Icon name="view" />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirm_password && <div style={{color:'red'}}>Confirm Password is Required</div>}
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">Gender</FormLabel>
                <RadioGroup isInline name="gender">
                  <Radio variantColor="red"  value="Male" ref={register}>Male</Radio>
                  <Radio variantColor="blue" value="Female" ref={register}>Female</Radio>
                  <Radio variantColor="green" value="Others" ref={register}>Others</Radio>
                  <Radio variantColor="orange" value="NA" ref={register}>Decline To Answer</Radio>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Box textAlign="center" mt={3}>
              <Button variantColor="yellow" variant="outline" size="lg" type="submit" isLoading={props.spinner}>
                Register
              </Button>
            </Box>
            <Box mt={5} textAlign="center">
              <Link color="blue.400" onClick={proceedToLogin}>Have an account? Sign in</Link>
            </Box>
          </form>
        </Box>
      </Flex>
    </Fragment>
  );
}

export default RegisterForm;
