import React from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbar from './CustomToolbar.js';




export default class DataSet extends React.Component {
    constructor(props) {
        super(props)
        this.state = { refresh: true }
        this.updateDataset = this.updateDataset.bind(this)
    }

    updateDataset() {
        if(this.props.hidden){
            return
        }
        fetch("http://localhost:8000/dataset/" + localStorage.uid)
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
        if(localStorage.dataset == null || localStorage.dataset == undefined){
            localStorage.dataset = '{}'
        }
        this.updateDataset();
        window.datasetInterval = setInterval(() => {
            this.updateDataset()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(window.datasetInterval)
    }

    render() {
        if(this.props.hidden){
            return <div></div>
        }
        var dataset = Object.entries(JSON.parse(localStorage.dataset))
        var rows = []
        var columns = []

        if(dataset.length != 0){
            for (var i = 0; i < Object.entries(dataset[0][1]).length; i++) {
                var row = []
                for (var x in dataset) {
                    row.push(dataset[x][1][i.toString()])
                }
                rows.push(row)
            }
            for (var x in (dataset)) {
                columns.push(
                    dataset[x][0]
                )
            }
        }

        return (
            <MUIDataTable
                title={"Experiment Data"}
                data={rows}
                columns={columns}
                options={{customToolbar: () => {
                    return (
                      <CustomToolbar />
                    );
                  }}}
            />
        );
    }
}