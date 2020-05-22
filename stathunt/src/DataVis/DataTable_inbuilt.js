import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function DataTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  
  var columns = []
  var rows = []
  // var columns = (() => {
  //   if(localStorage.dataset == undefined){
  //     return []
  //   }
  //   console.log(localStorage.dataset)
  //   var out = []
  //   var dataset = Object.entries(JSON.parse(localStorage.dataset))
  //   for (var x in dataset) {
  //     out.push({
  //       id: dataset[x][0],
  //       label: dataset[x][0],
  //       minWidth: 100,
  //       align: 'right'
  //     })
  //   }
  //   return out
  // })()
  // var rows = (() => {
  //   var out = []
  //   var dataset = Object.entries(JSON.parse(localStorage.dataset))
  //   for (var i = 0; i < Object.entries(dataset[0][1]).length; i++) {
  //     var row = {}
  //     for (var x in dataset) {
  //       row[dataset[x][0]] = dataset[x][1][i.toString()]
  //     }
  //     out.push(row)
  //   }
  //   return out
  // })()

  const updateData = () => {
    fetch("http://localhost:8000/dataset/" + localStorage.uid)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (localStorage.dataset != response && response != '') {
          console.log(response)
          localStorage.dataset = (response);
          setPage(1)
          setPage(0)
        }
      })
    if(localStorage.getItem('dataset') == ""){
      return
    }
    var dataset = JSON.parse(localStorage.dataset)
    for (var x in Object.keys(dataset)) {
      columns.push({
        id: x,
        label: x,
        minWidth: 170,
        align: 'right'
      })
    }
  }
  useEffect(() => {
    clearInterval(window.datasetInterval) 
    updateData()
    window.datasetInterval = setInterval(() => {
      updateData()
    }, 1000)
  },[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper >
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
