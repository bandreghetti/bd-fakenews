import React from 'react';
import {
  TextField,
  Typography,
  withStyles,
  Card,
  Paper,
  CardContent,
  Grid,
  Collapse,
  CardActions,
  Button
} from '@material-ui/core';

const styles = (theme) => ({
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
    minWidth: 800,
    maxWidth: 1000,
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  sendButton: {
    justifyContent: 'flex-end',
    display: 'flex',
    marginLeft: 'auto',
    paddingRight: 35,
  }
})

class Update extends React.Component {

  state = {
    files: [],

  }

  handleFileUpload = (event) => {
    this.setState({files: event.target.files})
  }

  render() {
    const { classes } = this.props;
    const { files } = this.state;
    const fields = [
      {field: 'news', label: 'ID da noticia'},
      {field: 'link', label: 'Link'},
      {field: 'vehicle', label: 'Veículo de mídia'},
      {field: 'author', label: 'Autor'},
    ];
    let filesRecvd = null;
    let hasFiles = false;
    if (files.length > 0) {
      filesRecvd = (
        Object.keys(files).map((fileKey) => (
            <Typography
              key={fileKey}
            >
              {files[fileKey].name}
            </Typography>
        ))
      )
      hasFiles = true;
    }
    return (
      <div className={classes.root}>
        <Paper>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                align="left"
              >
                Atualizar essa coisa toda que tá ai
              </Typography>
              <Grid container>
                {fields.map((field, idx) => (
                  <Grid
                    item
                    xs={6}
                    key={`${idx}-grid`}
                  >
                    <TextField
                      fullWidth
                      label={field.label}
                      style ={{width: '95%'}}
                      onChange={(event) => this.handleChange(event, field.field)}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Collapse
                in={hasFiles}
              >
                  {filesRecvd}
              </Collapse>
              <CardActions className={classes.sendButton} disableActionSpacing>
                <input
                  accept="image/*, video/*"
                  className={classes.input}
                  id="flat-button-file"
                  multiple
                  type="file"
                  onChange={this.handleFileUpload}
                />
                <label htmlFor="flat-button-file">
                  <Button variant="contained"  color="secondary" component="span" className={classes.button}>
                    Upload mídias
                  </Button>
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.send}
                >
                    Enviar!
                </Button>
              </CardActions>
          </Card>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(Update);