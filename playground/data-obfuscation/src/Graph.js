import { ResponsiveLine } from '@nivo/line';
import React, { Component } from 'react';
import dataGen from './DataGen';
export default class Graph extends Component {
    render() {
        return (<ResponsiveLine
            data={dataGen()}
            enableArea={true}
            pointColor={'labels.text.fill'}
            pointBorderWidth={'0px'}
            margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
            xScale={{ type: 'linear', min: 0, max: 800}}
            yScale={{ type: 'linear', stacked: false, min: 0, max: 500 }}
            curve="basis"
            axisTop={null}
            axisRight={{
                tickValues: [
                    0,
                    100,
                    200,
                    300,
                    400,
                    500
                ],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: '.2s',
                legend: '',
                legendOffset: 0
            }}
            axisBottom={{
                tickValues: [
                    0,
                    100,
                    200,
                    300,
                    400,
                    500,
                    600,
                    700,
                    800,
                    900
                ],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: '.2f',
                legend: 'completion time',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickValues: [
                    0,
                    100,
                    200,
                    300,
                    400,
                    500
                ],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: '.2s',
                legend: 'number of participants',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            colors={{ scheme: 'spectral' }}
            lineWidth={1}
            pointSize={4}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={1}
            pointBorderColor={{ from: 'serieColor' }}
            enablePointLabel={false}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            gridXValues={[0,
                0,
                100,
                200,
                300,
                400,
                500,
                600,
                700,
                800,
                900]}
            gridYValues={[0,
                100,
                200,
                300,
                400,
                500]}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 12,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />);
    }
}