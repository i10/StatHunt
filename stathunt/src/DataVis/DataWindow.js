import React, { Component } from 'react';
// import MUIDatatable from 'mui-datatables';
import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
const mui_columns = ["Participant", "Input Method", "Task Completion Time (s)"];
const mt_columns = (function () {
    var out = [];
    for (var x in mui_columns) {
        var column = {};
        column["title"] = mui_columns[x];
        column["field"] = mui_columns[x];
        out.push(column);
    }
    return out;
});

// var mui_data = function () {
//     var data = [];
//     var gen = [0, true];
//     for (var i = 0; i < 1000; i++) {
//         var row = [];
//         row.push(gen[0]);
//         row.push((gen[1] ? "QWERTY" : "QWERTZ"));
//         row.push(Math.floor(Math.random() * 70) + 10);
//         gen[0]++;
//         gen[1] = !gen[1];
//         data.push(row)
//     }
//     return data
// }

var mt_data = function () {
    var data = [];
    var gen = [0, true];
    for (var i = 0; i < 1000; i++) {
        var row = {};
        row[mui_columns[0]] = (gen[0]);
        row[mui_columns[1]] = (gen[1] ? "Finger" : "Stylus");
        row[mui_columns[2]] = Math.floor(Math.random() * 70) + 10;
        gen[0]++;
        gen[1] = !gen[1];
        data.push(row)
    }
    return data
}

export default class DataWindow extends Component {
    render() {
        // const options = {
        //     responsive: "scrollMaxHeight",
        //     print: false,
        //     download: false
        // }
        return <Grid container>
            <Grid item sm={9} style={{ margin: '40px' }}>
                {/* <MUIDatatable title={"Rat Lab 1"} data={table_data()} columns={columns} options={options} /> */}
                <MaterialTable
                    columns={mt_columns()}
                    data={mt_data()}
                    title={"Typing Study"}
                    actions={[
                        {
                            icon: 'visibility_off',
                            tooltip: 'Name Obfuscation',
                            isFreeAction: true,
                            onClick: (event) => alert("Names Get Obfuscated")
                        },
                        {
                            icon: 'shuffle',
                            tooltip: 'Value Obfuscation',
                            isFreeAction: true,
                            onClick: (event) => alert("Values Get Obfuscated")
                        },
                        {
                            icon: 'bar_chart',
                            tooltip: 'Refresh Visualisation',
                            isFreeAction: true,
                            onClick: (event) => alert("Open Visualisation")
                        },
                    ]}
                />
                <Grid item sm={3} />
            </Grid>
        </Grid>
    }
}