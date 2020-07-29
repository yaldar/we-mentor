import React, { useState, useEffect } from 'react';
// import { Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import ChatCard from './ChatCard';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getConversationsQuery = id => `{
  conversations(id: "${id}"){
    conversation_id
  }
}`;

function Chats(props) {
  const [conversations, setConversations] = useState({ conversations: [] });

  useEffect(() => {
    if (props.userID) {
      if (props.userID.id) {
        apolloFetch({
          query: getConversationsQuery(props.userID.id),
        }).then(res => {
          console.log(res.data);
          setConversations({ conversations: [...res.data.conversations] });
        });
      }
    }
  }, [props]);

  return (
    <div>
      {conversations.conversations.map(el => {
        
        return(
        <ChatCard getConversationId={props.getConversationId} id={el.conversation_id} key={el.conversation_id} />
      )})}
    </div>
  );
}

export default Chats;
