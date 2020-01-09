import React, { Fragment } from 'react';
import 'typeface-roboto';
import {ChatContainer, Bar, DesignContainer, DataContainer} from './Layout';
import { Grid } from '@material-ui/core';

export default function App() {
  return <Fragment>
    <Bar/>
    <Grid container>
      <Grid item sm={4}>
        <ChatContainer/>
      </Grid>
      <Grid item sm={4}>
        <DataContainer/>
      </Grid>
      <Grid item sm={4}>
        <DesignContainer/>
      </Grid>
    </Grid>
  </Fragment>
}

