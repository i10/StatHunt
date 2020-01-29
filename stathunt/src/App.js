import React, { Fragment, Component } from 'react';
import 'typeface-roboto';
import {ChatContainer, NavBar, DesignContainer, DataContainer} from './Layout';
import { Grid } from '@material-ui/core';

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
      <Grid container style={{height: '100%'}}>
        <Grid item sm={12}>
          <NavBar onViewButtonClick={this.changeView}/>
        </Grid>
        {(()=>{
          if(this.state.view === 0){
            return <Grid item sm={8} style={{height:'100%'}}>
              <DesignContainer />
            </Grid>
          }
          return <Grid item sm={8} style={{height:'100%'}}>
            <DataContainer />
          </Grid>
        })()}
        <Grid item sm={4} style={{height:'100%'}} bottom={0}>
          <ChatContainer />
        </Grid>
      </Grid>
    </Fragment>
  }
}
