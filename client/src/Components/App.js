import React from 'react';
import Matches from './Matches';
import Profilecreation from './Profilecreation';

function App() {

  return (
    <div className="App">
      <Profilecreation />
      <Matches userId="1" />
    </div>
  );
}

export default App;
