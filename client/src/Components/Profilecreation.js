import { Col, Row, Container } from 'reactstrap';
import React, { useState } from 'react';
const { createApolloFetch } = require('apollo-fetch');
// possibility to toggle btw mentor/mentee status
// get info, picture from LinkedIn through authentication
// form for motivational letter/ drag n drop for a text file

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

function Profilecreation(props) {
  const [state, setState] = useState({
    linkedin_id: '',
    name: '',
    bio: '',
    city: '',
    years: '',
    stack: '',
    technologies: [],
    pref_technologies: []
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

  const addPrefTechnologies = event => {
    let form = document.getElementById('form');
    let inputs = form.querySelectorAll('.pref_tech');
    let arr = [];

    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].checked) {
        arr.push(inputs[i].value);
      }
    }
    setState({
      ...state,
      pref_technologies: [...arr],
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    apolloFetch({
      query: `mutation {
                addUser(
                    linkedin_id: "${props.userData.id}",
                  name: "${props.userData.localizedFirstName} ${props.userData.localizedLastName}",
                  bio: "${state.bio}",
                  city: "${state.city.toLowerCase()}",
                  years: "${state.years}",
                  stack: "${state.stack}",
                  technologies: "${state.technologies}",
                  role: "${state.role}",
                  current_job: "${state.job}",
                  pref_city: "${state.pref_city.toLowerCase()}",
                  pref_years: "${state.pref_years}",
                  pref_stack: "${state.pref_stack}",
                  pref_technologies: "${state.pref_technologies}"
                ){
                  name
                }
              }`,
    }).then(res => {
    });
  };

  return (
    <div className='profile-creation'>
      <h1>Create your We-Mentor profile</h1>
      <form className='form' id='form'>
        <p>Select your role</p>
        <input type='radio' id='mentor' name='role' value='mentor' onChange={handleChange} />
        <label for='mentor'>Mentor</label>
        <br />
        <input type='radio' id='mentee' name='role' value='mentee' onChange={handleChange} />
        <label for='mentee'>Mentee</label>
        <br />
        <p>Id: {props.userData ? props.userData.id : ''}</p>
        <p>Name: {props.userData ? props.userData.localizedFirstName : ''} {props.userData ? props.userData.localizedLastName: '' }</p>
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
        <input
          type='text'
          name='job'
          placeholder='Enter your current job'
          value={state.job || ''}
          onChange={handleChange}
        />
        <br />
        <p>Enter your years of experience:</p>
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
        <p>Enter your stack:</p>
        <input type='radio' id='Front-end' name='stack' value='Front-end' onChange={handleChange} />
        <label for='Front-end'>Front-end</label>
        <br />
        <input type='radio' id='Back-end' name='stack' value='Back-end' onChange={handleChange} />
        <label for='Back-end'>Back-end</label>
        <br />
        <input type='radio' id='Fullstack' name='stack' value='Fullstack' onChange={handleChange} />
        <label for='Fullstack'>Fullstack</label>
        <br />
        <p>Enter your technologies:</p>
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
        <input type='checkbox' id='Java' name='tech' value='Java' onChange={addTechnologies} className='tech' />
        <label for='Java'>Java</label>
        <br />
        <input type='checkbox' id='C' name='tech' value='C' onChange={addTechnologies} className='tech' />
        <label for='C'>C</label>
        <br />
        <input type='checkbox' id='Node' name='tech' value='Node' onChange={addTechnologies} className='tech' />
        <label for='Node'>Node</label>
        <br />
        <input type='checkbox' id='Python' name='tech' value='Python' onChange={addTechnologies} className='tech' />
        <label for='Python'>Python</label>
        <br />
        <hr />
        <h5>What are you looking for in a mentor/mentee?</h5>
        <br />
        <label for='pref_city'> Preferred city of mentor/mentee: </label>
        <input type='text' name='pref_city' placeholder='City' value={state.pref_city || ''} onChange={handleChange} />
        <p>Preferred years of experience of your mentor/mentee</p>
        <input type='radio' id='0-3' name='pref_years' value='0-3' onChange={handleChange} />
        <label for='0-3'>0-3</label>
        <br />
        <input type='radio' id='3-5' name='pref_years' value='3-5' onChange={handleChange} />
        <label for='3-5'>3-5</label>
        <br />
        <input type='radio' id='5-10' name='pref_years' value='5-10' onChange={handleChange} />
        <label for='5-10'>5-10</label>
        <br />
        <input type='radio' id='10+' name='pref_years' value='10+' onChange={handleChange} />
        <label for='10+'>10+</label>
        <br />
        <p>Preferred stack of your mentor/mentee</p>
        <input type='radio' id='Front-end' name='pref_stack' value='Front-end' onChange={handleChange} />
        <label for='Front-end'>Front-end</label>
        <br />
        <input type='radio' id='Back-end' name='pref_stack' value='Back-end' onChange={handleChange} />
        <label for='Back-end'>Back-end</label>
        <br />
        <input type='radio' id='Fullstack' name='pref_stack' value='Fullstack' onChange={handleChange} />
        <label for='Fullstack'>Fullstack</label>
        <br />
        <p>Preferred technologies of mentor/mentee</p>
        <input
          type='checkbox'
          id='pref_JavaScript'
          name='pref_technologies'
          value='JavaScript'
          onChange={addPrefTechnologies}
          className='pref_tech'
        />
        <label for='pref_JavaScript'>JavaScript</label>
        <br />
        <input
          type='checkbox'
          id='pref_Java'
          name='pref_technologies'
          value='Java'
          onChange={addPrefTechnologies}
          className='pref_tech'
        />
        <label for='pref_Java'>Java</label>
        <br />
        <input type='checkbox' id='pref_C' name='pref_technologies' value='C' onChange={addPrefTechnologies} className='tech' />
        <label for='pref_C'>C</label>
        <br />
        <input
          type='checkbox'
          id='pref_Node'
          name='pref_technologies'
          value='Node'
          onChange={addPrefTechnologies}
          className='pref_tech'
        />
        <label for='pref_Node'>Node</label>
        <br />
        <input
          type='checkbox'
          id='pref_Python'
          name='pref_technologies'
          value='Python'
          onChange={addPrefTechnologies}
          className='pref_tech'
        />
        <label for='pref_Python'>Python</label>
        <br />
        <br />
        <input type='submit' value='Submit' onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Profilecreation;
