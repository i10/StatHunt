import React from 'react';
import {AppBar, Toolbar, Typography, Tabs, Tab} from '@material-ui/core/';


export default class App extends React.Component {
  constructor(props){
    super(props);
    
    this.STabs = styled(Tabs)({
      flexGrow: 1
    })
  }

  render() {
    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            StatHunt
          </Typography>
          <STabs>
            <Tab label="One" />
            <Tab label="Two" />
            <Tab label="Two" />
          </STabs>
        </Toolbar>
      </AppBar>
    );
  }
}