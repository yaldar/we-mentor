import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import Navigationbar from './Navigationbar';
const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getUserQuery = id => {
  return `{
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
};

const Profile = props => {
  const [state, setState] = useState({});

  const userId = props.userData ? props.userData.id : '';

  const capitalizeFLetter = (string) => {   
    const capitalized = string[0].toUpperCase() +  
      string.slice(1);
      return capitalized; 
  } 

  const getUserData = async () => {
    const profileData = await apolloFetch({
      query: getUserQuery(userId),
    });

    if (profileData.data.user) {
      const userTechnologies = profileData.data.user.technologies[0].split(',');

      const userCity = capitalizeFLetter(profileData.data.user.city);

      const matchCity = capitalizeFLetter(profileData.data.user.preferences.city);

      setState({ profileData: profileData, userTechnologies: userTechnologies, userCity: userCity, matchCity: matchCity });
      console.log('STATE:', profileData.data.user);
    }
  };

  useEffect(() => {
    getUserData();
  }, [props]);

  return (
    <div>
      <Navigationbar className='navbar' />
      <section className='content'>
        <h3>{state.profileData ? state.profileData.data.user.name : ''}s profile</h3>
        <br></br>

        <p>Bio: {state.profileData ? state.profileData.data.user.bio : ''}</p>

        <p>City: {state.userCity ? state.userCity : ''}</p>

        <p>Years of experience: {state.profileData ? state.profileData.data.user.years : ''}</p>

        <p>Stack: {state.profileData ? state.profileData.data.user.stack : ''}</p>

        <p>Technologies: {state.userTechnologies ? state.userTechnologies.map(el => `* ${el} `) : ''}</p>

        <p>Role: {state.profileData ? state.profileData.data.user.role : ''}</p>

        <p>Current job: {state.profileData ? state.profileData.data.user.current_job : ''}</p>

        <p>Preferred city of mentor: {state.matchCity ? state.matchCity : ''}</p>

        <p>Preferred years of mentor: {state.profileData ? state.profileData.data.user.preferences.years : ''}</p>

        <p>Preferred stack of mentor: {state.profileData ? state.profileData.data.user.preferences.stack : ''}</p>

        <p>Preferred technologies of mentor: {state.profileData ? state.profileData.data.user.preferences.technologies : ''}</p>

        <Link to="/profileedit">
        <Button color="success">Edit</Button>
        </Link>

      </section>
    </div>
  );
};

export default Profile;
