// profile search form. (radio buttons or roll down menus with preselected properties).
// search form and hits in a separate view.
// the hits is viewed as a card containing: picture, name, years working, current job, technologies, city.
// if you click card, you get to the profile.

import React from 'react';
import Navigationbar from './Navigationbar';


const Search = () => {
  return (
      <div>
        <Navigationbar className='navbar' />

              Search for people here!
      </div>
  );
}

export default Search;