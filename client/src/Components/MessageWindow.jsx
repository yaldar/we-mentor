import React, { useEffect, useState } from 'react';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getConversationQuery = () => `{
    conversation(id: "id"){
        id,
        name,
        message
        }
    }`;

// MAX'S HOOKS TUTORIAL FOR CARRO
// this.state = {
//    conversations:[]
// }

function MessageWindow() {
  const [state, setState] = useState({ conversation: [] });

  const fetchConversation = () => {
    apolloFetch({
      query: getConversationQuery(),
    })
      .then((res) => {
        setState({ conversation: [...res.data.conversation] });
      });
  };
  useEffect(() => {
    setInterval(() => {
      fetchConversation();
    }, 1000);
  }, []);

  return (
    <div className="chat-container">
      <section className="message-container">
        {state.conversation.map((el) => (
          <div>
            <p>{el.name}</p>
            {' '}
            <p>{el.message}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MessageWindow;
