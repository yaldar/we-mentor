import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import MatchCard from './MatchCard';
const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getMatchesQuery = (id) => `{
  matches(id: "${id}")
}`

function Matches(props) {
  const [matches, setMatches] = useState({ matches: [] });

  useEffect(() => {
    console.log('Matches user id', props.userId);
    if(props.userId) {
      apolloFetch({
        query: getMatchesQuery(props.userId),
      })
      .then(res => {
        setMatches({ matches: [...res.data.matches] });
        return res; 
      })
      .then(res => props.getFirstMatch(res.data.matches[0]));
    }
    
  }, [props]);

  return (
      <div>
        {matches.matches.map(id => {
          return (
              <MatchCard getMatchData={props.getMatchData} id={id} key={id} />
          );
        })}
      </div>
  );
}

export default Matches;

// Sidebar is updated on each page-load.
// useEffect
// fetch request to server endpoint 'api/:userid/matches'
// gets back list of matched users

// based on matching profiles.
// app.GET(api/:userid/matches')
// retrieve user data from db & filter for matches
// filter in 2 steps: matching from both sides

// Randomised each time
// Math.random - show 5 random users from array each time

// each time u save yr profile or log in, we re-iterate the mathcingArray

// if profile updated, the matches should change.
// Clicking on a match should take u to profile.

// EXAMPLE VERTICAL SLICE:
// client side: list of matches based on a specific user

// /api/matches: the logic for collecting matches

// db - users
