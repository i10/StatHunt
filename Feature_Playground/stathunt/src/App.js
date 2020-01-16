import React, { Fragment, Component } from 'react';
import 'typeface-roboto';
import {ChatContainer, NavBar, DesignContainer, DataContainer} from './Layout';
import { Grid, LinearProgress } from '@material-ui/core';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      view: 0
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView(){
    this.setState({
      view: (this.state.view + 1)%2
    })
  }

  render(){
      return <Fragment>
      <NavBar onViewButtonClick={this.changeView}/>
      <LinearProgress variant="determinate" value={60} color="secondary"/>
      <ChatContainer/>
      <Grid container>
        {(()=>{
          if(this.state.view === 0){
            return <Grid item sm={12} style={{height:'100vh'}}>
              <DesignContainer />
            </Grid>
          }
          return <Grid item sm={12} style={{height:'100vh'}}>
            <DataContainer />
          </Grid>
        })()}
      </Grid>
    </Fragment>
  }
}
