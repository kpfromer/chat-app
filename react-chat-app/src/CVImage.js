import React, { Component } from 'react'
import socketIo from 'socket.io-client';

export default class CVImage extends Component {

  state = {
    src: ''
  }

  componentDidMount() {
    const io = socketIo('http://localhost:3002');
    io.on('image', (image) => {
      this.setState({ src: `data:image/jpeg;base64,${image}` });
    })
  }
  render() {
    return (
      <div>
        <img src={this.state.src} alt="webcam" />
      </div>
    )
  }
}
