import '../App.css';
import LoggedInApp from './LoggedInApp';
import Login from './Login';
import Profilecreation from './Profilecreation';import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
const { createApolloFetch } = require('apollo-fetch');
// import { Col, Row, Container } from 'reactstrap';



const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getUserQuery = id => {
  return `{
    user(id: "${id}") {
      name
    }
  }`;
};


function App() {
  const [cookies] = useCookies(['accessToken']);
  const [state, setState] = useState({});

  console.log(cookies);

  useEffect(() => {


    if (cookies.accessToken) {
      setState({ loggedIn: true });
      
      const checkIfUserExist = async () => {
        
        const userData = await fetch('http://localhost:4000/checkuser', {headers: {Cookie: cookies.accessToken}, credentials: 'include'})
        .then(res => res.json());
        
        const userId = userData.id; 
        console.log(userId);
        
        const userExist = await apolloFetch({
          query: getUserQuery(userId),
        });
        console.log('hereeeeeeeeeee', userExist);
        if(userExist.data.user){
          setState(prevState => ({...prevState, userExist: true, userData}));
        } else {
          setState(prevState => ({...prevState, userExist: false, userData}));
        }
      }
      checkIfUserExist();

    } else {
      setState({ loggedIn: false });
    }
  }, []);

  /*---------------

  GET /v2/me HTTP/1.1
Host: api.linkedin.com
Connection: Keep-Alive
Authorization: Bearer {access_token}


------------*/


  return (
    <div>
      <BrowserRouter>
        <Route exact path='/'>
          {state.loggedIn ? (state.userExist ? <LoggedInApp userData={state.userData} /> : <Profilecreation userData={state.userData} />): <Login />}
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
