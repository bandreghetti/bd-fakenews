import React from 'react';
import { withStyles, Paper, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core';


const styles = ({
    root: {
        backgroundColor: '#c3c9d6',
        minHeight: '100vh',
        display: 'flex',
        flexdirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    },
})
let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
class Retrieve extends React.Component {
    render () {
        const { classes } = this.props
        return (
          <div className={classes.root}>
            <Paper>
              <Table>
              <TableHead>
              <TableRow>
                <TableCell>Codigo Noticia</TableCell>
                <TableCell>Manchete</TableCell>
                <TableCell>Submetida por</TableCell>
                <TableCell>CPF do candidato</TableCell>
                <TableCell>Nome do candidato</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Partido</TableCell>
                <TableCell>Coligacao</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell numeric>{row.calories}</TableCell>
                    <TableCell numeric>{row.fat}</TableCell>
                    <TableCell numeric>{row.carbs}</TableCell>
                    <TableCell numeric>{row.protein}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
              </Table>
          </Paper>
          </div>
        )
    }
}

export default withStyles(styles)(Retrieve);