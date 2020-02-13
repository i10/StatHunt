import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Grid, Paper } from '@material-ui/core';

export default class App extends Component{

  render(){
    return <React.Fragment>
      <AppBar position='sticky'>
        <Toolbar />
      </AppBar>
      <Grid container>
        <Grid item xm={4} style={{width: '33vw'}}><Paper /></Grid>
        <Grid item xm={4}>
          <CSVReader onFileLoaded={data => console.log(data)}/>
        </Grid>
        <Grid item xm={4}></Grid>
      </Grid>
    </React.Fragment>

  }
}