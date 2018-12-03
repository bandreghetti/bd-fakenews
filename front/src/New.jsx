import React from 'react';
import db_api from './Common/axiosOrderers';
import { withStyles, Paper, Card, CardContent, Typography, Grid, Divider } from '@material-ui/core';


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
  card: {
    minWidth: 200,
    maxWidth: 600,
  },
})

class New extends React.Component {
  state = {
    new_: {}
  }
  componentWillMount () {
    const { match } = this.props;
    db_api.get(`/new/${match.params.id}`)
      .then(response => {this.setState({new_: response.data })})
      .catch(err => {console.log(err)})
  }

  render () {
    console.log(this.state.new_)
    const { classes } = this.props;
    const { new_ } = this.state;
    let data = null;
    if (new_) {
      let mediaCod = null;
      if(new_.mediaLink){
        mediaCod = new_.mediaLink
      }
      data = (
        <Grid container>
          <Grid item xs={6}>
            <Typography component="p" align="left">
              Manchete
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" align="right" color="textSecondary">
              {new_.headline}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography align="left">
              Corpo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" color="textSecondary">
              {new_.body}
            </Typography>
          <Grid xs={12}>
            <Divider />
          </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" align="left">
              Enviado por
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography align="right" color="textSecondary">
              {new_.submittedby}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" align="left">
              Autor
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography align="right" color="textSecondary">
              {new_.author}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" align="left">
              Veículo
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography align="right" color="textSecondary">
              {new_.vehicle}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" align="left">
              {new_.mediaLink ? "Link para publicação" : null}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography align="right" color="textSecondary">
              <a href={mediaCod}>
                {mediaCod}
              </a>
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
        </Grid>
      );
    }
    return (
      <div className={classes.root}>
        <Paper>
          <Card className={classes.card}>
            <CardContent>
            <Typography
              color="textSecondary"
              gutterBottom
              align="left"
            >
              Aqui está a cuestão do caso
            </Typography>
            {data}
            </CardContent>
          </Card>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(New);