import React from 'react';
import { withStyles, Paper, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import db_api from './Common/axiosOrderers';

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

class Retrieve extends React.Component {
    state = {
      news: []
    }
    componentWillMount () {
      this.getNews();
    }
    getNews = () => {
      db_api.get('/allnews')
        .then(response => {this.setState({ news: response.data})})
        .catch(err => console.log(err));
    }
    render () {
        const { classes } = this.props
        const { news } = this.state;
        return (
          <div className={classes.root}>
            <Paper style={{
              maxWidth: '98%'
            }}>
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
              {news.map(row => {
                return (
                  <TableRow key={row.cod}>
                    <TableCell>
                      {row.cod}
                    </TableCell>
                    <TableCell>{row.headline}</TableCell>
                    <TableCell>{row.submittedBy}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.local}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.party}</TableCell>
                    <TableCell>{row.coligation}</TableCell>
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