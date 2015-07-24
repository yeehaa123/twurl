/*global window */
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import Bookmarks from '../components/Bookmarks.jsx';
import * as BookmarkActions from '../actions/BookmarkActions';

import Bootstrap from '../phoenix-bootstrap';

let chan = Bootstrap.init()
chan.join().receive("ignore", () => console.log("auth error"))
    .receive("ok", () => console.log("join ok"))
    .after(10000, () => console.log("Connection interruption"))

chan.onError(e => console.log("something went wrong", e))

chan.onClose(e => console.log("channel closed", e))


@connect(state => ({
  bookmarks: state.bookmarks
}))


export default class CounterApp extends Component {

  componentDidMount(){
    const { dispatch, bookmarks } = this.props;
    chan.on("new:msg", msg => {
      let { title, url } = msg;
      dispatch(BookmarkActions.addBookmark(title, url));
    })
  }

  render() {
    const { dispatch, bookmarks } = this.props;
    return (
      <Bookmarks bookmarks={ bookmarks } {...bindActionCreators(BookmarkActions, dispatch)} />
    );
  }
}
