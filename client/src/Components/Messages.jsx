import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import Navigationbar from './Navigationbar';
import Chat from './Chat';
import Chats from './Chats';

const Messages = props => {
  const [state, setState] = useState({ activeConversation: null });
  const getConversationId = event => {
    setState({ activeConversation: event.target.id })
  };

  return (
    <div>
      <Navigationbar className="navbar" />

      <Container className="themed-container">
        <Row>
          <Col>
            <Chat conversationId={props.matchId ? props.matchId : state.activeConversation} userData={props.userData} />
          </Col>
          <Col>
            <Chats getConversationId={getConversationId} userData={props.userData}/>
          </Col>
        </Row>
      </Container>
</div>
  );
};

Messages.Prototypes = {
  userData: PropTypes.object,
};

export default Messages;
