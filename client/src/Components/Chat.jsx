import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';
import MessageWindow from './MessageWindow';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const sendMessageQuery = (id, name, message) => `mutation{
    addMessage(id: "${id}", name:"${name}", message: "${message}"){
      name
    }
  }`;

const Chat = (props) => {
  const [state, setState] = useState({ message: '' });
  const writeMessage = (event) => {
    setState({
      ...state,
      message: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log('ID', props.conversationId, 'na,e', props.userData.localizedFirstName, 'state', state.message );
    apolloFetch({
      query: sendMessageQuery(props.conversationId ,props.userData.localizedFirstName, state.message),
    });
  };
  useEffect(()=>{},[props]);
  return (
    <div className="chat-container">
      <MessageWindow conversationId={props.conversationId}/>
      <Form>
        <FormGroup>
          <Label for="exampleText" />
          <Input type="textarea" name="text" id="exampleText" value={state.message} onChange={writeMessage} />
        </FormGroup>
        <Button className="connect__button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

Chat.propTypes = {
  userData: PropTypes.object,
};

export default Chat;
