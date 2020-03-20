import React, { Component } from 'react';
import { randomNormal } from 'd3-random';
import { Grid, Slider } from '@material-ui/core/';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      epsilon: 0
    }
  }
  getDistr() {
    var normal = Array.from(Array(1000).keys(), x => ([x, randomNormal(100, 10)()]));
    console.log(normal);
    return normal;
  }

  obfuscate(val, eps) {
    const mu = -.5;
    const b = eps;
    var u = Math.random() - 0.5;
    return val + (mu - b * (u < 0 ? -1 : 1) * Math.log(1 - 2 * Math.abs(u)));
  }
  render() {
    return <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          <Slider value={this.state.epsilon} onChange={(e, newVal) => this.setState({epsilon: newVal})}/>
        </Grid>
        <Grid item xs={8}>
          <table>
            <tr><td>Part ID</td><td>Values</td><td>Obfuscated Values</td></tr>
            {this.getDistr().map((el) =>
              <tr><td>{el[0]}</td>
                <td>{el[1]}</td>
                <td>{this.obfuscate(el[1], this.state.epsilon)}</td></tr>)}
          </table>
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </Grid>

    </React.Fragment>
  }
}