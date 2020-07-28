import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import '../App.css';
import Navigationbar from './Navigationbar';
import Matches from './Matches';
import Profileother from './Profileother';

function Home(props) {
  const [state, setState] = useState({ user: null, clickedMatch: null });

  const getMatchData = (event) => setState({ clickedMatch: event.target.id });

  const getFirstMatch = (id) => setState({ clickedMatch: id });

  useEffect(() => {
    setState({ user: props.userData.id });
  }, [props]);

  // <Route exact path="/">
  // {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
  // </Route>

  return (
    <div className="LoggedInApp">
      <Navigationbar className="navbar" />

      <Container className="themed-container">
        <Row>
          <Col>
            <Profileother matchId={state.clickedMatch} />
          </Col>
          <Col>
            <Matches
              getFirstMatch={getFirstMatch}
              getMatchData={getMatchData}
              userId={state.user}
            />
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default Home;
