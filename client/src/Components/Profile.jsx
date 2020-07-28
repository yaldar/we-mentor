import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import Navigationbar from './Navigationbar';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getUserQuery = (id) => `{
      user(id: "${id}") {
        name,
        bio,
        city,
        years,
        stack,
        technologies
        role,
        current_job,
        preferences {
            city,
            years,
            stack,
            technologies
        }
      }
    }`;

const Profile = (props) => {
  const [state, setState] = useState({});

  const userId = props.userData ? props.userData.id : '';

  const capitalizeFLetter = (string) => {
    const capitalized = string[0].toUpperCase() + string.slice(1);
    return capitalized;
  };

  const getUserData = async () => {
    const profileData = await apolloFetch({
      query: getUserQuery(userId),
    });

    if (profileData.data.user) {
      const userTechnologies = profileData.data.user.technologies[0].split(',');

      const userCity = capitalizeFLetter(profileData.data.user.city);

      const matchCity = capitalizeFLetter(profileData.data.user.preferences.city);

      const matchTechnologies = profileData.data.user.preferences.technologies[0].split(',');

      setState({
        profileData,
        userTechnologies,
        userCity,
        matchCity,
        matchTechnologies,
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, [props]);

  return (
    <div>
      <Navigationbar className="navbar" />
      <section className="content">
        <h3>
          {state.profileData ? state.profileData.data.user.name : ''}
          s profile
        </h3>
        <br />
        <h6>Role</h6>
        <p>{state.profileData ? state.profileData.data.user.role : ''}</p>
        <hr />
        <h6>Bio</h6>
        <p>{state.profileData ? state.profileData.data.user.bio : ''}</p>
        <hr />
        <h6>City</h6>
        <p>{state.userCity ? state.userCity : ''}</p>
        <hr />
        <h6>Years of experience</h6>
        <p>
          {' '}
          {state.profileData ? state.profileData.data.user.years : ''}
        </p>
        <hr />
        <h6>Stack</h6>
        {' '}
        <p>{state.profileData ? state.profileData.data.user.stack : ''}</p>
        <hr />
        <h6>Technologies</h6>
        <p>
          {' '}
          {state.userTechnologies ? state.userTechnologies.map((el) => `* ${el} `) : ''}
        </p>
        <hr />
        <h6>Current job</h6>
        <p>
          {' '}
          {state.profileData ? state.profileData.data.user.current_job : ''}
        </p>
        <hr />
        <h6>Preferred city of mentor</h6>
        <p>
          {' '}
          {state.matchCity ? state.matchCity : ''}
        </p>
        <hr />
        <h6>Preferred years of mentor</h6>
        <p>
          {' '}
          {state.profileData ? state.profileData.data.user.preferences.years : ''}
        </p>
        <hr />
        <h6>Preferred stack of mentor</h6>
        <p>
          {' '}
          {state.profileData ? state.profileData.data.user.preferences.stack : ''}
        </p>
        <hr />
        <h6>
          Preferred technologies of mentor
        </h6>
        {' '}
        <p>
          {state.matchTechnologies ? state.matchTechnologies.map((el) => `* ${el} `) : ''}
        </p>
        <hr />
        <Link to="/profileedit">
          <Button color="success">Edit</Button>
        </Link>
      </section>
    </div>
  );
};

export default Profile;
