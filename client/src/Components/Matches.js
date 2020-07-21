import React, { } from 'react';

function Matches() {
    // on mount fetches, state contains: array of matches, user info for each of the matches
    // show the picture, bio, - only some of the info abt the user

  return (
    <div>
      
    </div>
  )
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

