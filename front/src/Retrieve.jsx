import React from 'react';
import { withStyles, Paper, TableHead, Table, TableRow, TableCell, TableBody, IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
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
        .then((response) => {
          if(response.data){
            this.setState({ news: response.data})
          }
        })
        .catch((err) => console.log(err));
    }

    delete = (news) => {
      db_api.delete(`/new/${news}`)
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
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news.map(row => {
                return (
                  <TableRow key={row.cod}>
                    <TableCell component="a" href={`/new/${row.cod}`}>
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
                    <TableCell>
                      <Grid container style={{display: 'flex', justifyContent: 'flex-start' }}>
                        <Grid item xs={6}>
                          <IconButton aria-label="add">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton aria-label="Delete" onClick={() => this.delete(row.cod)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
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