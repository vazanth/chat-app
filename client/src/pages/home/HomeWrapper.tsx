import React, { Fragment } from 'react';
//@chakra-ui
import { Box, Flex  } from "@chakra-ui/core";
//child components
import TopBar from './Topbar';
import SideBar from './Sidebar';
import UserConversation from '../user/UserConversation';
//store
import { UserProvider } from '../../context/User';
import { MessageProvider } from '../../context/Message';

const HomeWrapper = () => {
  return(
    <Fragment>
      <UserProvider>
        <Flex direction="row" h="100%">
          <Box w="30%" p="4" borderWidth="1px" rounded="lg">
            <SideBar />
          </Box>
          <Box w="100%">
            <TopBar />
            <MessageProvider>
              <UserConversation />
            </MessageProvider>
          </Box>
        </Flex>
      </UserProvider>
    </Fragment>
  )
}

export default HomeWrapper