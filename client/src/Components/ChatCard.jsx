import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const ChatCard = (props) => {
  const [chat, setChat] = useState({});

  useEffect(() => {
    // apolloFetch({
    //   query: `{
    //     conversation(id: "${props.id}") {
    //       name
    //     }
    //   }`,
    // }).then((res) => {
    //   setMatch({
    //     name: res.data.user.name,
    //     bio: res.data.user.bio,
    //     current_job: res.data.user.current_job,
    //   });
    // });
  }, []);

  return (
    <Card id={props.id} onClick={props.getConversationId}>
      <CardBody id={props.id}>
        <CardTitle id={props.id}>{props.id}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default ChatCard;
