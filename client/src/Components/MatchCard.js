import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const MatchCard = props => {
  const [match, setMatch] = useState({});

  useEffect(() => {
    fetch({
      query: `{
        user(id: "${props.id}") {
          name,
          bio,
          current_job
        }
      }`,
    }).then(res => {
      setMatch({ name: res.data.user.name, bio: res.data.user.bio, current_job: res.data.user.current_job });
    });
  }, []);

  return (
    <Card id={props.id} onClick={props.getMatchData} >
      <img width="50px" height="50px" src="https://media-exp1.licdn.com/dms/image/C4E03AQGFKxm0Qju_PQ/profile-displayphoto-shrink_800_800/0?e=1600905600&v=beta&t=IGZPvnRLwXwltXRENqfQa9HMfZdGDWR8s4THpAIFKyY" alt="Card image cap" id={props.id} />
      <CardBody id={props.id}>
        <CardTitle id={props.id}>{match.name}</CardTitle>
        <CardSubtitle id={props.id}>{match.current_job}</CardSubtitle>
        <CardText id={props.id}>{match.bio}</CardText>
      </CardBody>
    </Card>
  );
};

export default MatchCard;
