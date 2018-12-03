import React from 'react';
import sherlock from './sherlock-holmes.svg';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';


const styles = (theme) => ({
    button: {
      paddingTop: theme.spacing.unit,
      marginLeft: 2*theme.spacing.unit
    }
});

const onClick = (history, func) => {
  history.push(`/${func}`);
}

const Root = (props) => (
  <div>
    <header className="App-header">
      <img src={sherlock} className="App-logo" alt="logo" />
        <div className={props.classes.button}>
          <Button
            variant="contained"
            color="secondary"
            className={props.classes.button}
            onClick={() => onClick(props.history, 'create')}
          >
            Reportar Fake News
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={props.classes.button}
            onClick={() => onClick(props.history, 'retrieve')}
          >
            Ver Fake News
          </Button>
        </div>
    </header>
  </div>
);

export default withStyles(styles)(Root);