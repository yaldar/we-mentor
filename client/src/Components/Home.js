import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import '../App.css';
import Navigationbar from './Navigationbar';
import Matches from './Matches';
import Profileother from './Profileother';

function Home (props) {
  const [state, setState] = useState({ user: null, clickedMatch: null });

  const getMatchData = async event => await setState({ clickedMatch: event.target.id });

  const getFirstMatch = async id => await setState({ clickedMatch: id });

  useEffect(() => {
    setState({ user: props.userData.id });
  }, [props]);

  return (
    <div className='LoggedInApp'>
  <Navigationbar className='navbar' />
 
              <Container className='themed-container'>
                <Row>
                  <Col>
                    <Profileother matchId={state.clickedMatch} />
                  </Col>
                  <Col>
                    <Matches getFirstMatch={getFirstMatch} getMatchData={getMatchData} userId={state.user} role={props.userData.role} />
                  </Col>
                </Row>
              </Container>
            
    </div>
  );
}

export default Home;
