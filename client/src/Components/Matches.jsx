import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getMatchesQuery = (id) => `{
  matches(id: "${id}")
}`;

function Matches(props) {
  const [matches, setMatches] = useState({ matches: [] });

  useEffect(() => {
    if (props.userId) {
      apolloFetch({
        query: getMatchesQuery(props.userId),
      })
        .then((res) => {
          setMatches({ matches: [...res.data.matches] });
          return res;
        })
        .then((res) => props.getFirstMatch(res.data.matches[0]));
    }
  }, [props]);

  return ( 
    <section   style={{overflowX : "scroll", height: "95vh", border: "gray solid 1px", borderRadius: "3px"}}>
      
      <h6 > {props.role === 'mentor' ? 'Mentees' : 'Mentors'} who match your criteria:</h6>

      {matches.matches.map((id) => (
        <MatchCard getMatchData={props.getMatchData} id={id} key={id} />
      ))}
    </section>
  );
}

export default Matches;
