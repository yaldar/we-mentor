import React, { useState, useEffect } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const ChatCard = props => {
  const [recipientName, setrecipientName] = useState();
  console.log(props.participants, props.userId);
  const recipientId =
    props.userId === props.participants[0] ? props.participants[1] : props.participants[0];
  useEffect(() => {
    apolloFetch({
      query: `{
        user(id: "${recipientId}") {
          name
        }
      }`,
    }).then(res => {
      setrecipientName(res.data.user.name);
    });
  }, [props]);

  return (
    <Card id={props.id} onClick={props.getConversationId}>
      <CardBody id={props.id}>
        <CardTitle id={props.id}>{recipientName}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default ChatCard;
