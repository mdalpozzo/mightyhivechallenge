import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import * as actions from './actions/actions';
import { dbUpdate } from './actions/actions';

import Ball from './comps/Ball.jsx';

import store from './store/store';

class App extends React.Component {
  render() {
    return (
      <div>
        <Ball />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
