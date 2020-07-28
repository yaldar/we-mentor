import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import Navigationbar from './Navigationbar';
const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

function Profilecreation(props) {
console.log('COMPONENT RENDERED');

  const [state, setState] = useState({
    linkedin_id: '',
    name: '',
    bio: '',
    city: '',
    years: '',
    stack: '',
    technologies: [],
    pref_technologies: [],
    redirectToHome: false
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
    setState(prev=>({
      ...prev,
      pref_technologies: [...arr],
    }));
  };

  const redirectToHome = () => {
    setState(prev=>({
      ...prev,
      redirectToHome: true
    }));
  } 

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
    redirectToHome();
    });
  };

  return (
    <div>
    {state.redirectToHome ? <Redirect to='/' /> : null}
        <Navigationbar className='navbar' />
        <section  className='profile-creation'>

      <h1>Create your We-Mentor profile</h1>
      <br />
          <br />
      <h6>Name</h6> <p>{props.userData ? props.userData.localizedFirstName : ''} {props.userData ? props.userData.localizedLastName: '' }</p>
        <br />
        <hr></hr>

      <form className='form' id='form'>
        <h6>Select role</h6>
        <input type='radio' id='mentor' name='role' value='mentor' onChange={handleChange} />
        <label for='mentor'>Mentor</label>
        <br />
        <input type='radio' id='mentee' name='role' value='mentee' onChange={handleChange} />
        <label for='mentee'>Mentee</label>
        <br />
        <hr></hr>
        {/* <p>Id: {props.userData ? props.userData.id : ''}</p> */}
        <h6>Enter your bio</h6>
        <input type='text' name='bio' placeholder='Enter bio' value={state.bio || ''} onChange={handleChange} />
        <br />     
        <hr></hr>
        <h6>Enter your city</h6>

        <input
          type='text'
          name='city'
          placeholder='Enter city'
          value={state.city || ''}
          onChange={handleChange}
        />{' '}
        <br />  
        <hr></hr>
        <h6>Enter your current job</h6>
        <input
          type='text'
          name='job'
          placeholder='Enter current job'
          value={state.job || ''}
          onChange={handleChange}
        />
        <br />    
        <hr></hr>
        <h6>Enter your years of experience</h6>
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
        <hr></hr>
        <h6>Enter your stack</h6>
        <input type='radio' id='Front-end' name='stack' value='Front-end' onChange={handleChange} />
        <label for='Front-end'>Front-end</label>
        <br />
        <input type='radio' id='Back-end' name='stack' value='Back-end' onChange={handleChange} />
        <label for='Back-end'>Back-end</label>
        <br />
        <input type='radio' id='Fullstack' name='stack' value='Fullstack' onChange={handleChange} />
        <label for='Fullstack'>Fullstack</label>
        <br />
        <hr></hr>

        <h6>Enter technologies</h6>
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
        <h5>What are you looking for in a {state.role === 'mentor' ? 'mentee' : 'mentor'}?</h5>
        <br />
        <h6> Preferred city of {state.role === 'mentor' ? 'mentee' : 'mentor'} </h6>
        <input type='text' name='pref_city' placeholder='City' value={state.pref_city || ''} onChange={handleChange} />
        <hr></hr>

        <h6>Preferred years of experience of your {state.role === 'mentor' ? 'mentee' : 'mentor'}</h6>
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

        <hr></hr>
        <h6>Preferred stack of your {state.role === 'mentor' ? 'mentee' : 'mentor'}</h6>
        <input type='radio' id='Front-end' name='pref_stack' value='Front-end' onChange={handleChange} />
        <label for='Front-end'>Front-end</label>
        <br />
        <input type='radio' id='Back-end' name='pref_stack' value='Back-end' onChange={handleChange} />
        <label for='Back-end'>Back-end</label>
        <br />
        <input type='radio' id='Fullstack' name='pref_stack' value='Fullstack' onChange={handleChange} />
        <label for='Fullstack'>Fullstack</label>
        <br />
        <hr></hr>

        <h6>Preferred technologies of {state.role === 'mentor' ? 'mentee' : 'mentor'}</h6>
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
        <input type='checkbox' id='pref_C' name='pref_technologies' value='C' onChange={addPrefTechnologies} className='pref_tech'/>
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
        <input type='submit' className="profile-edit__button" value='Submit' onClick={handleSubmit} />
      </form>
      </section>
    </div>
  );
}

export default Profilecreation;
