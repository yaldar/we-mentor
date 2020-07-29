// When visiting another profile it should show if u match on profile.
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardText, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getMatchUserQuery = (id) => `{
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

const Profileother = ({ matchId }) => {
  const [matchProfile, setMatchProfile] = useState({ technologies: [] });

  const capitalizeFLetter = (string) => {
    const capitalized = string[0].toUpperCase() + string.slice(1);
    return capitalized;
  };

  useEffect(() => {
    apolloFetch({
      query: getMatchUserQuery(matchId),
    }).then((res) => {
      if (res.data.user) {
        const {
          name,
          bio,
          current_job,
          city,
          stack,
          years,
          technologies,
        } = res.data.user;

        const userCity = capitalizeFLetter(res.data.user.city);

        setMatchProfile({
          name,
          bio,
          current_job,
          city: userCity,
          stack,
          years,
          technologies: [...technologies],
        });
      }
    });
  }, [matchId]);

  return (
    <Card>
      <img
        width="100px"
        height="100px"
        src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"
        // TODO change place holder later
        alt="placeholder alt"
      />
      <CardBody>
        <h4><CardTitle>{matchProfile.name}</CardTitle></h4>
        <br></br>

        <CardSubtitle>{matchProfile.current_job}</CardSubtitle>
        <CardText>{matchProfile.bio}</CardText>
        <p>
          City: 
          {matchProfile.city}
        </p>
        <p>
          Stack:
          {matchProfile.stack}
        </p>
        <p>
          Years:
          {matchProfile.years}
        </p>
        <p>Technologies:</p>
        <ul>
          {matchProfile.technologies.map((el) => (
            <li>{el}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

// Profileother.propTypes = {
//   matchId: propTypes.string.isRequired,
// };

Profileother.propTypes = {
  // TODO to fix this linting error we can add .isRequired
  // problem is I'm not yet sure if it's required or not
  matchId: PropTypes.string,
};

export default Profileother;
