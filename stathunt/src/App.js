import React, { Fragment, Component } from 'react';
import 'typeface-roboto';
import { DesignContainer, DataContainer } from './Layout';
import { Grid, AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    }

    this.viewChange = this.viewChange.bind(this)
  }

  componentDidMount() {
    if (localStorage.uid == null) {
      fetch("http://localhost:8000/uid")
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log("New user_id generated: " + response["user_id"]);
          localStorage.uid = response["user_id"]
        });
    } else {
      console.log("User id found " + localStorage.uid)
    }


    window.botpressWebChat.init({
      host: 'http://localhost:3000',
      botId: 'isv1',
      userId: localStorage.uid
    })
  }

  viewChange(event, newValue) {
    this.setState({ view: newValue })
  }
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#05e297',
          contrastText: 'inherit'
        },
        secondary: {
          main: '#5A6D7D'
        },
      }
    })
    return <Fragment>
      <ThemeProvider theme={theme}>
        <AppBar color='secondary' position="fixed">
          <Toolbar>
            <Typography color='primary.contrastText' variant="h4" style={{ flex: 1 }}>StatHunt</Typography>
            <Tabs value={this.state.view} onChange={this.viewChange} aria-label="simple tabs example">
              <Tab label="Experiment Design" />
              <Tab label="Dataset" />
              <Tab label="Question Posting" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div hidden={this.state.view !== 0}>
          <Grid container style={{ height: '100%' }}>
            <Grid item sm={8}>
              <DesignContainer ref="designContainer" hidden={this.state.view !== 0} />
            </Grid>
            <Grid item sm={4} />
          </Grid>
        </div>
        <div hidden={this.state.view !== 1}>
          <Grid container style={{ height: '100%' }}>
            <Grid item sm={8}>
              <DataContainer />
            </Grid>
            <Grid item sm={4} />
          </Grid>
        </div>
        <div hidden={this.state.view !== 2}>
          <Grid container style={{ height: '100%' }}>
            <Grid item sm={8}>
            </Grid>
            <Grid item sm={4} />
          </Grid>
        </div>

      </ThemeProvider>
    </Fragment>
  }
}
