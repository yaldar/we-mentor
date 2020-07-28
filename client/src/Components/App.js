import '../App.css';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import Profileedit from './Profileedit';
import Messages from './Messages';
import Search from './Search';
import Profilecreation from './Profilecreation';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const { createApolloFetch } = require('apollo-fetch');

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
        const userData = await fetch('http://localhost:4000/checkuser', {
          headers: { Cookie: cookies.accessToken },
          credentials: 'include',
        }).then(res => res.json());

        const userId = userData.id;
        console.log(userId);

        const userExist = await apolloFetch({
          query: getUserQuery(userId),
        });
        console.log('hereeeeeeeeeee', userExist);
        if (userExist.data.user) {
          setState(prevState => ({ ...prevState, userExist: true, userData }));
        } else {
          setState(prevState => ({ ...prevState, userExist: false, userData }));
        }
      };
      checkIfUserExist();
    } else {
      setState({ loggedIn: false });
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/profile'>
            <Profile userData={state.userData} />
          </Route>
          <Route path='/messages'>
            <Messages />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>

          <Route path='/profileedit'>
            <Profileedit userData={state.userData}/>
          </Route>

          <Route exact path='/'>
            {state.loggedIn ? (
              state.userExist ? (
                <Home userData={state.userData} />
              ) : (
                <Profilecreation userData={state.userData} />
              )
            ) : (
              <Login />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
