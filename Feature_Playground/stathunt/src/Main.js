import React from 'react';
import 'typeface-roboto';
import {Box, Grid} from '@material-ui/core';
import NavBar from './Components/NavBar';
import ChatBox from './Components/ChatBox';

function Main() {
  return (
    <Box>
      <NavBar />
      <Grid container spacing={2}>
        <Grid container item xs={4} justify={"center"}>
          <ChatBox />
        </Grid>
        <Grid container item xs = {8}>

        </Grid>
      </Grid>

    </Box>
  ); 
}

export default Main;