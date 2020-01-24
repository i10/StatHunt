import React, {Component} from 'react';
import MUIDatatable from 'mui-datatables';
import { Grid } from '@material-ui/core';
import DataGraph from './DataGraph';

const columns = ["part_id", "keyboard_layout", "task_completion_time"];

var table_data = function() {
    var data = [];
    var gen = [0, true];
    for (var i = 0; i < 1000; i++){
        var row = [];
        row.push(gen[0]);
        row.push((gen[1] ? "QWERTY" : "QWERTZ"));
        row.push(Math.floor(Math.random()*70)+10);
        gen[0]++;
        gen[1] = !gen[1];
        data.push(row)
    }
    return data
}
export default class DataWindow extends Component{
    render(){
        return <Grid container>
                <Grid item sm={4} style={{height: '100%'}}>
                    <DataGraph />
                </Grid>
                <Grid item sm={8} style={{height:'100%'}}>
                    <MUIDatatable title={"Rat Lab 1"} data={table_data()} columns={columns} /> 
                </Grid>
            </Grid>
    }
}