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
    this.changeView = this.changeView.bind(this);
    this.updateWorkspaceXml = this.updateWorkspaceXml.bind(this);
  }

  changeView(x) {
    this.setState({
      view: x
    })
  }

  updateWorkspaceXml(id, value){
    this.refs.designContainer.updateWorkspaceXml(id, value);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#5A6D7D'
        },
        secondary: {
          main: '#ffffff'
        },
      }
    })
    return <Fragment>
      <ThemeProvider theme={theme}>
        <Grid container style={{ height: '100%' }}>
          <Grid item sm={12}>
            <NavBar onViewButtonClick={this.changeView} />
          </Grid>
          {(() => {
            if (this.state.view === 0) {
              return <Grid item sm={8} style={{ height: '100%' }}>
                <DesignContainer ref="designContainer"/>
              </Grid>
            }
            return <Grid item sm={8} style={{ height: '100%' }}>
              <DataContainer />
            </Grid>
          })()}
          <Grid item sm={4} style={{ height: '100%' }} bottom={0}>
            <ChatContainer updateWorkspaceXml={this.updateWorkspaceXml}/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Fragment>
  }
}
