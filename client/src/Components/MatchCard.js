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
    <Card>
      <img width="auto" height="auto" src="https://media-exp1.licdn.com/dms/image/C4E03AQHQ-RCTZeB-Mw/profile-displayphoto-shrink_400_400/0?e=1600905600&v=beta&t=H89DcIPpyxkxgf2mqyLtg943faKT15Rq7DXXGXzNXsM" alt="Card image cap" />
      <CardBody>
        <CardTitle>{match.name}</CardTitle>
        <CardSubtitle>{match.current_job}</CardSubtitle>
        <CardText>{match.bio}</CardText>
      </CardBody>
    </Card>
  );
};

export default MatchCard;
