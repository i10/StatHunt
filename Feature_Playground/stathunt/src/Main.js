import React from 'react';
import 'typeface-roboto';
import {Box, AppBar, Grid, Container} from '@material-ui/core';
import ChatBox from './Chat/ChatBox';

function Main() {
  return (
    <Box>
      <AppBar position="static">StatHunt</AppBar>
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