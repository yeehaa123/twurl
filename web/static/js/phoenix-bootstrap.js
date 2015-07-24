import React from 'react';
const {Socket, LongPoller} = window.Phoenix;

class Bootstrap {

  static init(){
    var socket = new Socket("/ws")
    socket.connect()

    socket.onClose( e => console.log("CLOSE", e))

    var chan = socket.chan("links", {})
    return chan;
  }
}

export default Bootstrap
