import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Navigationbar from './Navigationbar';

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  useEffect(() => {
    removeCookie('accessToken');
  });

  return (
    <div>
      <Navigationbar className="navbar" />
      Goodbye!
    </div>
  );
};

export default Logout;
