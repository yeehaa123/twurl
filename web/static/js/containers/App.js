import React, { Component } from 'react';
import Twurl from './Twurl.jsx';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores';
import '../../styles/app.scss';

const redux = createRedux(stores);

export default class App extends Component {
  render() {
    return (
      <Provider redux={ redux }>
        {() => <Twurl />}
      </Provider>
    );
  }
}
