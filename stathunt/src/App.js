import React, { Fragment, Component } from 'react';
import 'typeface-roboto';
import { ChatContainer, NavBar, DesignContainer, DataContainer } from './Layout';
import { Grid } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    }
    this.designContainer = React.createRef();
    this.updateWorkspaceXml = this.updateWorkspaceXml.bind(this);
  }

  updateWorkspaceXml(id, value) {
    this.refs.designContainer.updateWorkspaceXml(id, value);
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
    }else{
      console.log("User id found " + localStorage.uid)
    }


    window.botpressWebChat.init({
      host: 'http://localhost:3000',
      botId: 'isv1',
      userId: localStorage.uid
    })
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
        <NavBar onViewButtonClick={this.changeView} />
        <Grid container style={{ height: '100%' }}>
          {(() => {
            if (this.state.view === 0) {
              return <Grid item sm={8}>
                <DesignContainer ref="designContainer" />
              </Grid>
            }
            return <Grid item sm={8}>
              <DataContainer />
            </Grid>
          })()}
          <Grid item sm={4}>
            <ChatContainer updateWorkspaceXml={this.updateWorkspaceXml} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Fragment>
  }
}
