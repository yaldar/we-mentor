import React from 'react';
import PropTypes from 'prop-types';
import Navigationbar from './Navigationbar';
import Chat from './Chat';
import Chats from './Chats';

const Messages = (props) => (
  <div>
    <Navigationbar className="navbar" />
    <Chat userData={props.userData} />
    <Chats />
  </div>
);

Messages.Prototypes = {
  userData: PropTypes.object,
};

export default Messages;
