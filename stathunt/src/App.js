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

  updateWorkspaceXml(id, value){
    this.refs.designContainer.updateWorkspaceXml(id, value);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#05e297',
          contrastText: '#fff'
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
            <ChatContainer updateWorkspaceXml={this.updateWorkspaceXml}/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Fragment>
  }
}
