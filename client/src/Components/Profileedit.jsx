import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
} from 'react-router-dom';
import Navigationbar from './Navigationbar';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const Profileedit = ({ userData }) => {
  const [state, setState] = useState({
    userData,
    redirectToHome: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const addTechnologies = () => {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('.tech');
    const arr = [];

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

  const addPrefTechnologies = () => {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('.pref_tech');
    const arr = [];

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

  const redirectToHome = () => {
    setState((prev) => ({
      ...prev,
      redirectToHome: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apolloFetch({
      query: `mutation {
                updateUser(
                  linkedin_id: "${userData.id}",
                  name: "${userData.localizedFirstName} ${userData.localizedLastName}",
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
    }).then(() => {
      redirectToHome();
    });
  };
  

  const fileSelected = (e) => {
    console.log(e.target.files[0]);
    // file to be stored in the db = e.target.files[0]
       // setState({
    //   ...state,
    //   [e.target.name]: e.target.files[0]
    // });
  };

  console.log('HERE IS USER DATA', state.userData ? state.bio : 'nope');


  return (
    <div>
      {state.redirectToHome ? <Redirect to="/" /> : null}
      <Navigationbar className="navbar" />
      <section className="profile-edit">
        {/* <div>IMAGE {userData ? userData.profilePicture.displayImage : ''}</div> */}
        <h1>Edit profile</h1>
        <h5>
          {userData ? userData.localizedFirstName : ''}
          {' '}
          {userData ? userData.localizedLastName : ''}
        </h5>
        <br />
        <br />
        <form className="form" id="form">

        <h6>Pic Upload</h6>
                  <input
                    type="file"
                    name="picture"
                    onChange={fileSelected}
                  />
                  <label htmlFor="file">File</label>
                  <br />
                  <hr />



          <h6>Select role</h6>
          <input type="radio" id="mentor" name="role" value="mentor" onChange={handleChange} /> <label htmlFor="mentor">Mentor</label>
          <br />
          <input type="radio" id="mentee" name="role" value="mentee" onChange={handleChange} /> <label htmlFor="mentee">Mentee</label>
          <hr />
          <h6> Edit your bio </h6>
          <input type="text" name="bio" placeholder="Edit bio" value={state.bio || ''} onChange={handleChange} />
          <br />
          <hr />
          <h6> Edit your city </h6>
          <input
            type="text"
            name="city"
            placeholder={state.city || "Edit city"}
            value={state.city || ''}
            onChange={handleChange}
          />
          {' '}
          <br />
          <hr />
          <h6> Edit your job </h6>
          <input
            type="text"
            name="job"
            placeholder="Edit current job"
            value={state.job || ''}
            onChange={handleChange}
          />
          <br />
          <hr />

          <h6>Edit years of experience</h6>
          <input type="radio" id="0-3" name="years" value="0-3" onChange={handleChange} /> <label htmlFor="0-3">0-3</label>
          <br />
          <input type="radio" id="3-5" name="years" value="3-5" onChange={handleChange} /> <label htmlFor="3-5">3-5</label>
          <br />
          <input type="radio" id="5-10" name="years" value="5-10" onChange={handleChange} /> <label htmlFor="5-10">5-10</label>
          <br />
          <input type="radio" id="10+" name="years" value="10+" onChange={handleChange} /> <label htmlFor="10+">10+</label>
          <br />
          <hr />

          <h6>Edit stack</h6>
          <input type="radio" id="Front-end" name="stack" value="Front-end" onChange={handleChange} /> <label htmlFor="Front-end">Front-end</label>
          <br />
          <input type="radio" id="Back-end" name="stack" value="Back-end" onChange={handleChange} /> <label htmlFor="Back-end">Back-end</label>
          <br />
          <input type="radio" id="Fullstack" name="stack" value="Fullstack" onChange={handleChange} /> <label htmlFor="Fullstack">Fullstack</label>
          <br />
          <hr />

          <h6>Edit technologies</h6>
          <input
            type="checkbox"
            id="JavaScript"
            name="tech"
            value="JavaScript"
            onChange={addTechnologies}
            className="tech"
          /> <label htmlFor="JavaScript">JavaScript</label>
          <br />
          <input type="checkbox" id="Java" name="tech" value="Java" onChange={addTechnologies} className="tech" /> <label htmlFor="Java">Java</label>
          <br />
          <input type="checkbox" id="C" name="tech" value="C" onChange={addTechnologies} className="tech" /> <label htmlFor="C">C</label>
          <br />
          <input type="checkbox" id="Node" name="tech" value="Node" onChange={addTechnologies} className="tech" /> <label htmlFor="Node">Node</label>
          <br />
          <input type="checkbox" id="Python" name="tech" value="Python" onChange={addTechnologies} className="tech" /> <label htmlFor="Python">Python</label>
          <br />
          <hr />
          <h5>
            What are you looking for in a {state.role === 'mentor' ? 'mentee' : 'mentor'}
            ?
          </h5>
          <br />
          <h6>
            {' '}
            Edit preferred city of {state.role === 'mentor' ? 'mentee' : 'mentor'}
          </h6>
          <input
            type="text"
            name="pref_city"
            placeholder="City"
            value={state.pref_city || ''}
            onChange={handleChange}
          />
          <hr />

          <h6>
            Edit preferred years of experience of {state.role === 'mentor' ? 'mentee' : 'mentor'}
          </h6>
          <input type="radio" id="0-3" name="pref_years" value="0-3" onChange={handleChange} /> <label htmlFor="0-3">0-3</label>
          <br />
          <input type="radio" id="3-5" name="pref_years" value="3-5" onChange={handleChange} /> <label htmlFor="3-5">3-5</label>
          <br />
          <input type="radio" id="5-10" name="pref_years" value="5-10" onChange={handleChange} /> <label htmlFor="5-10">5-10</label>
          <br />
          <input type="radio" id="10+" name="pref_years" value="10+" onChange={handleChange} /> <label htmlFor="10+">10+</label>
          <br />
          <hr />

          <h6>
            Edit preferred stack of {' '}{state.role === 'mentor' ? 'mentee' : 'mentor'}
          </h6>
          <input type="radio" id="Front-end" name="pref_stack" value="Front-end" onChange={handleChange} /> <label htmlFor="Front-end">Front-end</label>
          <br />
          <input type="radio" id="Back-end" name="pref_stack" value="Back-end" onChange={handleChange} /> <label htmlFor="Back-end">Back-end</label>
          <br />
          <input type="radio" id="Fullstack" name="pref_stack" value="Fullstack" onChange={handleChange} /> <label htmlFor="Fullstack">Fullstack</label>
          <br />
          <hr />

          <h6>
            Edit preferred technologies of {state.role === 'mentor' ? 'mentee' : 'mentor'}
          </h6>
          <input
            type="checkbox"
            id="pref_JavaScript"
            name="pref_technologies"
            value="JavaScript"
            onChange={addPrefTechnologies}
            className="pref_tech"
          /> <label htmlFor="pref_JavaScript">JavaScript</label>
          <br />
          <input
            type="checkbox"
            id="pref_Java"
            name="pref_technologies"
            value="Java"
            onChange={addPrefTechnologies}
            className="pref_tech"
          /> <label htmlFor="pref_Java">Java</label>
          <br />
          <input
            type="checkbox"
            id="pref_C"
            name="pref_technologies"
            value="C"
            onChange={addPrefTechnologies}
            className="pref_tech"
          /> <label htmlFor="pref_C">C</label>
          <br />
          <input
            type="checkbox"
            id="pref_Node"
            name="pref_technologies"
            value="Node"
            onChange={addPrefTechnologies}
            className="pref_tech"
          /> <label htmlFor="pref_Node">Node</label>
          <br />
          <input
            type="checkbox"
            id="pref_Python"
            name="pref_technologies"
            value="Python"
            onChange={addPrefTechnologies}
            className="pref_tech"
          /> <label htmlFor="pref_Python">Python</label>
          <br />
          <br />
          <input type="submit" className="profile-edit__button" value="Submit" onClick={handleSubmit} />
        </form>
      </section>
    </div>
  );
};

// <3 this is how to do props validation for a prop that's an object
// Profileedit.propTypes = {
//   userData: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default Profileedit;
