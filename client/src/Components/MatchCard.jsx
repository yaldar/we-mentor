import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const MatchCard = (props) => {
  const [match, setMatch] = useState({});

  useEffect(() => {
    apolloFetch({
      query: `{
        user(id: "${props.id}") {
          name,
          bio,
          current_job
        }
      }`,
    }).then((res) => {
      setMatch({
        name: res.data.user.name,
        bio: res.data.user.bio,
        current_job: res.data.user.current_job,
      });
    });
  }, []);

  return (
    <article className="matchcard">
    <Card id={props.id} onClick={props.getMatchData}>
      <img width="50px" height="50px" src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg" alt="placeholder alt" id={props.id} />
      <CardBody id={props.id}>
        <h5><CardTitle id={props.id}>{match.name}</CardTitle></h5>
        <br></br>
        <p><CardSubtitle id={props.id}>{match.current_job}</CardSubtitle></p>
        <p><CardText id={props.id}>{match.bio}</CardText></p>
      </CardBody>
    </Card>
    </article>
  );
};

export default MatchCard;
