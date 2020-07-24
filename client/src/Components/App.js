import React, {useState} from 'react';
import Matches from './Matches';
import { Col, Row, Container } from 'reactstrap';
import Profileother from './Profileother';
import '../App.css';

function App() {

  const [state, setState] = useState({ user: '1', clickedMatch: null });
  
  const getMatchData = async (event) => await setState({ clickedMatch: event.target.id });
  
  const getFirstMatch = async (id) =>  await setState({ clickedMatch: id });

  return (
    <div className="App">
    <Container className="themed-container">.
      <Row>
        <Col>.col</Col>

        <Col>
        <Profileother matchId={state.clickedMatch}/>
        </Col>

        <Col><Matches getFirstMatch={getFirstMatch} getMatchData={getMatchData} userId={state.user}/></Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
