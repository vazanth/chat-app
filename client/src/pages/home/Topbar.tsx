import React, { Fragment } from 'react';

//@chakra-ui
import { Box } from '@chakra-ui/core';

const TopBar = () => {
  return(
    <Fragment>
      <Box bgImage="linear-gradient(84.06deg, #0088FF -28.62%, #A033FF 36.39%, #FF5C87 98.74%)" p={4} color="white">
        Am a TopBar
      </Box>
    </Fragment>
  )
}

export default TopBar