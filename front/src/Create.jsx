import React from 'react';
import {
  withStyles,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  CardActions,
  Collapse
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
    title: {
      fontSize: 14,
    },
    card: {
      minWidth: 800,
      maxWidth: 1000,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    sendButton: {
      justifyContent: 'flex-end',
      display: 'flex',
      marginLeft: 'auto',
      paddingRight: 35,
    }
});

class CreateFakeNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  handleFileUpload = (event) => {
    this.setState({files: event.target.files})
  }

  send = () => {

  }
  render(){
    const { classes } = this.props;
    const { files } = this.state;
    const fields = [
      {field: 'username', label: 'Nome de Usuário'},
      {field: 'email', label: 'Email'},
      {field: 'candidate', label: 'Candidato'},
      {field: 'vehicle', label: 'Veículo de mídia'},
      {field: 'link', label: 'Link'},
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
    return(
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
                  Submeter nova fake news taokei
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
                  <Grid item xs={12}>
                    <TextField
                      style={{width: '97.5%'}}
                      label="Título"
                      onChange={(event) =>  this.handleChange(event, 'title')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Corpo da Matéria"
                      multiline
                      rows="6"
                      className={classes.textField}
                      margin="normal"
                      style={{width: '97.5%'}}
                    />
                  </Grid>
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
        </div>
    );
  }

};

export default withStyles(styles)(CreateFakeNews);