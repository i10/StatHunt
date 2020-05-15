import React, { Component } from 'react';
// import MUIDatatable from 'mui-datatables';
import { Grid, Button } from '@material-ui/core';
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
    return []
}

export default class DataWindow extends Component {
    constructor(props) {
        super(props)

        this.fileUpload = this.fileUpload.bind(this)
    }

    fileUpload() {
        var data = new FormData()
        data.append("file", document.getElementById('file-upload').files[0])
        fetch('http://localhost:8000/uploadfile/' + localStorage.uid, {
            // content-type header should not be specified!
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(success => {
                console.log("File Succesfully Uploaded")
            })
            .catch(error => console.log(error)
            );
    }

    render() {
        return <Grid container>
            <Grid item sm={12} style={{ margin: '60px' }}>
                    <input
                        accept="*.csv"
                        id="file-upload"
                        multiple
                        type="file"
                        onChange={this.fileUpload}
                    />
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
            </Grid>
        </Grid>
    }
}