import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import '../App.css';
import Navigationbar from './Navigationbar';
import Matches from './Matches';
import Profileother from './Profileother';
import Footer from './Footer';


function Home(props) {
  const [state, setState] = useState({ clickedMatch: null });

  const getMatchData = (event) => setState({ clickedMatch: event.target.id });

  const getFirstMatch = (id) => setState({ clickedMatch: id });

  console.log('This is props', props.userData.id);

  useEffect(() => {
    setState({ user: props.userData.id });
  }, [props]);

  return (
    <div className="home">
      <Navigationbar className="navbar" />

      <Container className="themed-container">
        <Row>
          <Col>
            <Profileother matchId={state.clickedMatch} userId={props.userData.id}/>
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
      <Footer></Footer>
    </div>
  );
}

export default Home;
