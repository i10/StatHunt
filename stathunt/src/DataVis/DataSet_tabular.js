import React from "react";
import {createColumn} from "tubular-common";
import { DataGrid } from "tubular-react";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';



export default class DataSet extends React.Component {
    constructor(props) {
        super(props)
        this.state = { refresh: true }
        this.updateDataset = this.updateDataset.bind(this)
    }

    updateDataset() {
        if (this.props.hidden) {
            return
        }
        fetch("http://78.46.171.75:8000/dataset/" + localStorage.uid)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (localStorage.dataset != response && response != '') {
                    console.log(response)
                    localStorage.dataset = (response);
                    this.setState({ refresh: !this.state.refresh })
                }
            })
        console.log('Dataset loaded')
    }

    componentWillMount() {
        this.updateDataset();
        window.datasetInterval = setInterval(() => {
            this.updateDataset()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(window.datasetInterval)
    }

    render() {
        var dataset = Object.entries(JSON.parse(localStorage.dataset))
        var rows = []

        for (var i = 0; i < Object.entries(dataset[0][1]).length; i++) {
            var row = {}
            for (var x in dataset) {
                row[dataset[x][0]] = dataset[x][1][i.toString()]
            }
            rows.push(row)
        }

        var columns = []

        for (var x in (dataset)) {
            columns.push(
                createColumn(dataset[x][0])
            )
        }

        return (
            <div>
                <DataGrid gridName="Tubular-React" columns={columns} dataSource={rows}>
                    <AddIcon />
                    <IconButton color="default" onClick={() => alert('I can help you to add features to your datagrid.')}>
                        <AddIcon />
                    </IconButton>
                </DataGrid>
            </div>
        );
    }
}