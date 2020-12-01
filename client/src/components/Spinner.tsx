import React, { Fragment } from 'react';
import { Spinner, Flex } from '@chakra-ui/core';

const Loader = ():JSX.Element => {
  return(
    <Fragment>
      <div className="backdrop">
        <Flex justify='center' flexWrap='wrap' align='center' h="100%">
        <Spinner
          thickness="50px"
          speed="0.65s"
          emptyColor="purple.200"
          color="red.500"
          size="xl"
        />
        </Flex>
      </div>
    </Fragment>
  )
}

export default Loader