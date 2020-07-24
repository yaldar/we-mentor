// possibility to toggle btw mentor/mentee status
// get info, picture from LinkedIn through authentication
// form for motivational letter/ drag n drop for a text file

import React, { useState, useEffect } from 'react';
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

function Profilecreation(props) {

  const [state, setState] = useState({
    name: '',
    bio: '',
    namePrint: '',
    bioPrint: '',
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log('namnet här', state.name);
  };

  const handleSubmit = event => {
    event.preventDefault();
      fetch({
        query: `mutation {
                addUser(
                    linkedin_id: "25",
                  name: "${state.name}",
                  bio: "${state.bio}",
                  city: "Oslo",
                  years: "0",
                  stack: "Back-end",
                  technologies: ["Python"],
                  role: "Mentee",
                  current_job: "Unemployed",
                  pref_city: "Oslo", 
                  pref_years: "3-5",
                  pref_stack: "Back-end",
                  pref_technologies: ["Python"]
                ){
                  name
                }
              }`,
      }).then(res => {
        console.log('RESPONSE 1', state.name);
        console.log('RESPONSE 2', res.data.addUser.name);

        setState({ ...state,
            namePrint: res.data.addUser.name, 
            bioPrint: res.data.addUser.bio 
        });
      });
  };

  useEffect(() => {
    fetch({
      query: `{
        addUser(name: "${state.name}", bio: "${state.bio}") {
            name
        }
      }`,
    })
      .then(res => {
        setState({ name: state.name });
      })
      .then(res => console.log('STATE', state.name));
  }, []);

  return (
    <div>
      <form className='form'>

        <input type='text' name='name' placeholder='Enter your name' value={state.name || ''} onChange={handleChange} onSubmit={handleSubmit}/>

        <input type='text' name='bio' placeholder='Enter your bio' value={state.bio || ''} onChange={handleChange} onSubmit={handleSubmit}/>

        <input type='submit' className='form__submit' value='Submit' onSubmit={handleSubmit} />

      </form>

      <p>Name: {state.namePrint}</p>
      <p>Bio: {state.bioPrint}</p>
    </div>
  );
}

export default Profilecreation;
