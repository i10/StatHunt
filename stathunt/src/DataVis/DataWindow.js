import React, { Component } from 'react';
// import MUIDatatable from 'mui-datatables';
import { Grid } from '@material-ui/core';
import DataSet from './DataSet.js'
export default class DataWindow extends Component {
    constructor(props) {
        super(props)

        this.fileUpload = this.fileUpload.bind(this)
    }

    fileUpload() {
        var data = new FormData()
        data.append("file", document.getElementById('file-upload').files[0])
        fetch('http://78.46.171.75:8000/uploadfile/' + localStorage.uid, {
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
            <Grid container item sm={10} style={{ margin: '60px' }}>
                <Grid item sm={12} style={{ margin: '20px' }}>
                    <input
                        accept="*.csv"
                        id="file-upload"
                        multiple
                        type="file"
                        onChange={this.fileUpload}
                    />
                </Grid>
                <Grid item sm={12}>
                    <DataSet hidden={this.props.hidden} />
                </Grid>
            </Grid>
        </Grid>
    }
}