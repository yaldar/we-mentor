import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';
import '../App.css';
import Navigationbar from './Navigationbar';
import Matches from './Matches';
import Profileother from './Profileother';
import Profilecreation from './Profilecreation';
import Messages from './Messages';
import Search from './Search';
import Logout from './Logout';

function App(props) {
  const [state, setState] = useState({ user: null, clickedMatch: null });

  const getMatchData = async event => await setState({ clickedMatch: event.target.id });

  const getFirstMatch = async id => await setState({ clickedMatch: id });

  console.log('IDMAFAKKA', props.userData.id);

  useEffect(() => {
    setState({user: props.userData.id});
  }, [props]);


  // <Route exact path="/">
  // {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
  // </Route>

  // if not logged in, then display linkedin login
  // if logged in but profile does not exist, redirect to create profile
  // if logged in and profile exists, show below

  return (
    <div className='App'>
      <Navigationbar className='navbar' />
      <BrowserRouter>

        <div>
          <Switch>
            
            <Route path='/logout'>
              <Logout />
            </Route>
            <Route path='/createprofile'>
              <Profilecreation />
            </Route>
            <Route path='/messages'>
              <Messages />
            </Route>
            <Route path='/search'>
              <Search />
            </Route>

            <Route path='/'>
              <Container className='themed-container'>
                <Row>
                  {/* <Col></Col> */}

                  <Col>
                    <Profileother matchId={state.clickedMatch} />
                  </Col>

                  <Col>
                    <Matches getFirstMatch={getFirstMatch} getMatchData={getMatchData} userId={state.user} />
                  </Col>
                </Row>
              </Container>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
