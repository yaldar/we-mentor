import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import MessageWindow from './MessageWindow';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getConversationQuery = () => `{
    conversation(id: "id"){
        id,
        name,
        message
        }
    }`;

const sendMessageQuery = (name, message) => `mutation{
    addMessage(id: "${uuidv4()}", name:"${name}", message: "${message}"){
      name
    }
  }`;

// MAX'S HOOKS TUTORIAL FOR CARRO
// this.state = {
//    conversations:[]
// }

const Chat = (props) => {
  const [state, setState] = useState({ message: '' });
  const writeMessage = (event) => {
    setState({
      ...state,
      message: event.target.value,
    });
  };

  const handleSubmit = () => {
    apolloFetch({
      query: sendMessageQuery(props.userData.localizedFirstName, state.message),
    });
  };

  useEffect(() => {
    apolloFetch({
      query: getConversationQuery(),
    })
      .then((res) => {
        setState({ conversation: [...res.data.conversation] });
      });
  }, []);

  return (
    <div className="chat-container">
      <MessageWindow />
      <Form>
        <FormGroup>
          <Label for="exampleText" />
          <Input type="textarea" name="text" id="exampleText" value={state.message} onChange={writeMessage} />
        </FormGroup>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

Chat.propTypes = {
  userData: PropTypes.object,
};

export default Chat;
