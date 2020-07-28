import React from 'react';
import Navigationbar from './Navigationbar';
import Chat from './Chat';
import Chats from './Chats';


const Messages = () => {
  return (
      <div>
        <Navigationbar className='navbar' />
    <Chat />
    <Chats />
              Juicy messages here!
      </div>
  );
}

export default Messages;