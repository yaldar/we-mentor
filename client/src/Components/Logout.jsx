import React from 'react';
import { useCookies } from 'react-cookie';
import { Alert } from 'reactstrap';

const Logout = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['accessToken']);

  const logOut = () => {
    removeCookie('accessToken');
  };

  return (
    <div>
      <Alert color='light' className="logout-alert">
        <h5 className="logout-alert--text">Are you sure you want to log out?</h5> 
        <a onClick={logOut} href="/"  className='logout__button--yes'>
          Yes
        </a>
        <a href="/"  className='logout__button--no'>
          No, take me back to We-Mentor!
        </a>
      </Alert>
    </div>
  );
};

export default Logout;

