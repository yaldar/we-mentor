import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Redirect, Route } from 'react-router-dom';
import Messages from './Messages';


const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getMatchUserQuery = id => `{
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

  const capitalizeFLetter = string => {
    const capitalized = string[0].toUpperCase() + string.slice(1);
    return capitalized;
  };

  const connect = () => {
    setMatchProfile(prev => ({
      ...prev,
      connect: true,
    }));
  };

  useEffect(() => {
    apolloFetch({
      query: getMatchUserQuery(matchId),
    }).then(res => {
      if (res.data.user) {
        const userCity = capitalizeFLetter(res.data.user.city);

        const userTechnologies = res.data.user.technologies[0].split(',');

        const { name, bio, current_job, stack, years } = res.data.user;

        setMatchProfile({
          name,
          bio,
          current_job,
          city: userCity,
          stack,
          years,
          technologies: [...userTechnologies],
        });
      } else {
        setMatchProfile({
          name: 'Sorry, no matching user.',
          bio:
            'Your matches are based on what preferences you have in your profile. Edit your preferences and you might find someone!',
          current_job: '',
          city: '',
          stack: '',
          years: '',
          technologies: [''],
        });
      }
    });
  }, [matchId]);

  console.log('MATCHID', matchId);

  return (
    <div className='profile-other'>

      {matchProfile.connect ? 
        // <Redirect
        //   to={{
        //     pathname: '/messages',
        //     state: { matchId: matchId },
        //   }}
        // />
            <Messages matchId={matchId} />
       : null}

      <Card>
        <img
          width='100px'
          height='100px'
          src='https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'
          // TODO change place holder later
          alt='placeholder alt'
        />
        <CardBody>
          <h4>
            <CardTitle>{matchProfile.name}</CardTitle>
          </h4>
          <hr></hr>
          <CardText>{matchProfile.bio}</CardText>

          <section className={matchProfile.city ? 'visible' : 'invisible'}>
            <h6>Current job</h6>
            <p>{matchProfile.current_job}</p>
            <h6>City</h6>
            <p>{matchProfile.city}</p>
            <h6>Stack</h6> <p>{matchProfile.stack}</p>
            <h6>Years</h6> <p>{matchProfile.years}</p>
            <h6>Technologies</h6>
            <ul>
              {matchProfile.technologies.map(el => (
                <li>{el}</li>
              ))}
            </ul>
            <br></br>
            <a onClick={connect} href='/messages' className='connect__button'>
              Connect with {matchProfile.name}
            </a>
          </section>
        </CardBody>
      </Card>
    </div>
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
