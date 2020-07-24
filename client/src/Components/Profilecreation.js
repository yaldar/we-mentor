// possibility to toggle btw mentor/mentee status
// get info, picture from LinkedIn through authentication
// form for motivational letter/ drag n drop for a text file

import React, { useState } from 'react';
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

function Profilecreation(props) {
  const [state, setState] = useState({
    name: '',
    bio: '',
    city: '',
    years: '',
    stack: '',
    technologies: [],
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const addTechnologies = event => {
    let form = document.getElementById('form');
    let inputs = form.querySelectorAll('.tech');
    let arr = [];

    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].checked) {
        arr.push(inputs[i].value);
      }
    }
    setState({
        ...state,
      technologies: [...arr],
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
 
    // BELOW: FIIIXAAAAAA technologies <----------------------------------------- !
    fetch({
      query: `mutation {
                addUser(
                    linkedin_id: "100",
                  name: "${state.name}",
                  bio: "${state.bio}",
                  city: "${state.city}",
                  years: "${state.years}",
                  stack: "${state.stack}",
                  technologies: "${state.technologies}", 
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
    //   console.log('RESPONSE 1', state.name);
    //   console.log('RESPONSE 2', res.data.addUser.name);
    });
  };

  return (
    <div>
      <form className='form' id='form'>
        <input type='text' name='name' placeholder='Enter your name' value={state.name || ''} onChange={handleChange} />
        <br />
        <input type='text' name='bio' placeholder='Enter your bio' value={state.bio || ''} onChange={handleChange} />
        <br />
        <input
          type='text'
          name='city'
          placeholder='Enter your city'
          value={state.city || ''}
          onChange={handleChange}
        />{' '}
        <br />
        <p>Enter your years of experience</p>
        <input type='radio' id='0-3' name='years' value='0-3' onChange={handleChange} />
        <label for='0-3'>0-3</label>
        <br />
        <input type='radio' id='3-5' name='years' value='3-5' onChange={handleChange} />
        <label for='3-5'>3-5</label>
        <br />
        <input type='radio' id='5-10' name='years' value='5-10' onChange={handleChange} />
        <label for='5-10'>5-10</label>
        <br />
        <input type='radio' id='10+' name='years' value='10+' onChange={handleChange} />
        <label for='10+'>10+</label>
        <br />
        <p>Enter your stack</p>
        <input type='radio' id='Front-end' name='stack' value='Front-end' onChange={handleChange} />
        <label for='Front-end'>Front-end</label>
        <br />
        <input type='radio' id='Back-end' name='stack' value='Back-end' onChange={handleChange} />
        <label for='Back-end'>Back-end</label>
        <br />
        <input type='radio' id='Fullstack' name='stack' value='Fullstack' onChange={handleChange} />
        <label for='Fullstack'>Fullstack</label>
        <br />
        <p>Enter your technologies</p>
        <input
          type='checkbox'
          id='JavaScript'
          name='tech'
          value='JavaScript'
          onChange={addTechnologies}
          className='tech'
        />
        <label for='JavaScript'>JavaScript</label>
        <br />
        <input type='checkbox' id='Node' name='tech' value='Node' onChange={addTechnologies} className='tech' />
        <label for='Node'>Node</label>
        <br />
        <input type='checkbox' id='Python' name='tech' value='Python' onChange={addTechnologies} className='tech' />
        <label for='Python'>Python</label>
        <br />
        <input type='submit' value='Submit' onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Profilecreation;
