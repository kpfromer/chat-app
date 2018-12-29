import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ChatBody from './ChatBody';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Chat extends Component {

  state = {
    messages: []
  }

  getMessages = async () => {
    const response = await axios.get('http://localhost:3002/messages');
    return response.data;
  }

  addMessage = async (message) => this.setState(prevState => ({
    messages: [...prevState.messages, message]
  }))

  sendMessage = async (message) => await axios.post('http://localhost:3002/messages', message);

  componentDidMount() {
    this.socket = io('http://localhost:3002');
    this.getMessages()
      .then(
        messages => 
          messages.forEach(message => this.addMessage(message))
      );
    this.socket.on('message', this.addMessage);
  }

  submit = event => {
    event.preventDefault();
    this.sendMessage({
      name: 'kyle',
      message: this.state.newMessageValue
    })
  }

  change = name => event => this.setState({ [name]: event.target.value })

  render() {
    return (
      <div>
        <ChatBody messages={this.state.messages}/>
        <form onSubmit={this.submit}>
          <TextField
            // id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.change('newMessageValue')}
          />
          {/* <input type="text" onChange={this.change('newMessageValue')}/> */}
          {/* <button type="submit">Submit</button> */}
          <Button color="primary" type="submit">
            Primary
          </Button>
        </form>
      </div>
    );
  }
}