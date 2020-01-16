import React, { Fragment, Component } from 'react';
import 'typeface-roboto';
import {ChatContainer, Bar, DesignContainer, DataContainer} from './Layout';
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
      <Bar onViewButtonClick={this.changeView}/>
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
