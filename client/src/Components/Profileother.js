// When visiting another profile it should show if u match on profile.
import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getMatchUserQuery = id => {
  return `{
    user(id: "${id}") {
      name,
      bio,
      current_job,
      city,
      stack,
      years,
      technologies
    }
  }`;
};

const Profileother = props => {
  const [matchProfile, setMatchProfile] = useState({ technologies: [] });

  useEffect(() => {
    apolloFetch({
      query: getMatchUserQuery(props.matchId),
    })
      .then(res => {
        if (res.data.user) {
            const { name, bio, current_job, city, stack, years, technologies } = res.data.user;
            setMatchProfile({
                name,
                bio,
                current_job,
                city,
                stack,
                years,
                technologies: [...technologies],
            });
        }
      });
  }, [props]);

  return (
    <Card>
      <img
        width="100px"
        height="100px"
        src="https://media-exp1.licdn.com/dms/image/C4E03AQFXOCQI6Huk6g/profile-displayphoto-shrink_800_800/0?e=1600905600&v=beta&t=QE2nEOXBoWNDy4vWrIEwYmGcqJMGwdTW0fQL_JAhYrU"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{matchProfile.name}</CardTitle>
        <CardSubtitle>{matchProfile.current_job}</CardSubtitle>
        <CardText>{matchProfile.bio}</CardText>
        <p>City: {matchProfile.city}</p>
        <p>Stack: {matchProfile.stack}</p>
        <p>Years: {matchProfile.years}</p>
        <p>Technologies:</p>
        <ul>
          {matchProfile.technologies.map(el => (
            <li>{el}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default Profileother;
