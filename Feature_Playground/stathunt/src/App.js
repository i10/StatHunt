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
      <Grid container>
        <Grid item sm={4}>
          <ChatContainer/>
        </Grid>
        {(()=>{
          console.log(this.state.view);
          if(this.state.view === 0){
            return <Grid item sm={8}>
              <DesignContainer />
            </Grid>
          }
          return <Grid item sm={8}>
            <DataContainer />
          </Grid>
        })()}
      </Grid>
    </Fragment>
  }
}
