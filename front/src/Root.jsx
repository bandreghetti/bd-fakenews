import React from 'react';
import sherlock from './sherlock-holmes.svg';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';


const styles = () => ({
    button: {
      paddingTop: '2%',
    }
});

const onClick = (history) => {
  history.push('/create')
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
            onClick={() => onClick(props.history)}
          >
            Reportar Fake News
          </Button>
        </div>
    </header>
  </div>
);

export default withStyles(styles)(Root);