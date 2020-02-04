import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import { Container, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import HorizontalNonLinearStepper from './NavigationStepper';

export default class App extends Component {
  render() {

    var data = [
      {
        "country": "AD",
        "hot dog": 63,
        "hot dogColor": "hsl(188, 70%, 50%)",
        "burger": 21,
        "burgerColor": "hsl(339, 70%, 50%)",
        "sandwich": 15,
        "sandwichColor": "hsl(32, 70%, 50%)",
        "kebab": 198,
        "kebabColor": "hsl(141, 70%, 50%)",
        "fries": 112,
        "friesColor": "hsl(0, 70%, 50%)",
        "donut": 28,
        "donutColor": "hsl(248, 70%, 50%)"
      },
      {
        "country": "AE",
        "hot dog": 134,
        "hot dogColor": "hsl(226, 70%, 50%)",
        "burger": 105,
        "burgerColor": "hsl(204, 70%, 50%)",
        "sandwich": 168,
        "sandwichColor": "hsl(153, 70%, 50%)",
        "kebab": 78,
        "kebabColor": "hsl(31, 70%, 50%)",
        "fries": 134,
        "friesColor": "hsl(46, 70%, 50%)",
        "donut": 198,
        "donutColor": "hsl(75, 70%, 50%)"
      },
      {
        "country": "AF",
        "hot dog": 98,
        "hot dogColor": "hsl(101, 70%, 50%)",
        "burger": 7,
        "burgerColor": "hsl(267, 70%, 50%)",
        "sandwich": 185,
        "sandwichColor": "hsl(87, 70%, 50%)",
        "kebab": 22,
        "kebabColor": "hsl(135, 70%, 50%)",
        "fries": 170,
        "friesColor": "hsl(247, 70%, 50%)",
        "donut": 45,
        "donutColor": "hsl(273, 70%, 50%)"
      },
      {
        "country": "AG",
        "hot dog": 149,
        "hot dogColor": "hsl(109, 70%, 50%)",
        "burger": 194,
        "burgerColor": "hsl(221, 70%, 50%)",
        "sandwich": 133,
        "sandwichColor": "hsl(293, 70%, 50%)",
        "kebab": 39,
        "kebabColor": "hsl(351, 70%, 50%)",
        "fries": 27,
        "friesColor": "hsl(51, 70%, 50%)",
        "donut": 65,
        "donutColor": "hsl(129, 70%, 50%)"
      },
      {
        "country": "AI",
        "hot dog": 80,
        "hot dogColor": "hsl(137, 70%, 50%)",
        "burger": 13,
        "burgerColor": "hsl(286, 70%, 50%)",
        "sandwich": 42,
        "sandwichColor": "hsl(57, 70%, 50%)",
        "kebab": 169,
        "kebabColor": "hsl(201, 70%, 50%)",
        "fries": 94,
        "friesColor": "hsl(276, 70%, 50%)",
        "donut": 46,
        "donutColor": "hsl(358, 70%, 50%)"
      },
      {
        "country": "AL",
        "hot dog": 47,
        "hot dogColor": "hsl(65, 70%, 50%)",
        "burger": 54,
        "burgerColor": "hsl(71, 70%, 50%)",
        "sandwich": 98,
        "sandwichColor": "hsl(139, 70%, 50%)",
        "kebab": 168,
        "kebabColor": "hsl(321, 70%, 50%)",
        "fries": 98,
        "friesColor": "hsl(229, 70%, 50%)",
        "donut": 162,
        "donutColor": "hsl(292, 70%, 50%)"
      },
      {
        "country": "AM",
        "hot dog": 25,
        "hot dogColor": "hsl(285, 70%, 50%)",
        "burger": 7,
        "burgerColor": "hsl(156, 70%, 50%)",
        "sandwich": 117,
        "sandwichColor": "hsl(51, 70%, 50%)",
        "kebab": 27,
        "kebabColor": "hsl(337, 70%, 50%)",
        "fries": 103,
        "friesColor": "hsl(271, 70%, 50%)",
        "donut": 181,
        "donutColor": "hsl(325, 70%, 50%)"
      }
    ];
    const graph = <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'fries'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'sandwich'
          },
          id: 'lines'
        }
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />;
    return <React.Fragment background='#32423'>
      <Grid container>
        <Grid xs={2} item>
          <Container>
            <Typography variant='h4' align='center' display='block' style={{padding:'10px'}}>
              Stathunt
          </Typography>
          </Container>

        </Grid>
        <Grid xs={10} item>
          <HorizontalNonLinearStepper />
        </Grid>
      </Grid>

      <Grid container>
        <Grid container xs={6}>
          <Grid item xs={12} style={{ height: '40vh' }}>
            {graph}
          </Grid>
          <Grid item xs={12} style={{ height: '50vh' }}>
            <MaterialTable columns={[
              { title: 'Country', field: 'country' },
              { title: 'Hot Dog', field: 'hot dog' },
              { title: 'Burger', field: 'burger' }
            ]}
              data={data} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>


  }
}