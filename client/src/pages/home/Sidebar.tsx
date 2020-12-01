import React, { Fragment } from 'react';
//@chakra-ui
import { Input, Avatar, Flex, Box } from "@chakra-ui/core";
//components
import UserList from '../user/UserList';
//store
import { useAuthState } from '../../context/Auth';

const SideBar = () => {
  const { userInfo } = useAuthState();

  return(
    <Fragment>
      <Flex direction="row" align="center" p={5}>
        <Avatar src={`data:image/png;base64, ${userInfo?.avatar}`} mr="3"/>
        Chats
      </Flex>
      <Input placeholder="Type here..." />
      <Box mt={5}>
        <UserList />
      </Box>
    </Fragment>
  )
}

export default SideBar