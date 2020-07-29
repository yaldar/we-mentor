import React, { useEffect, useState } from 'react';

const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getConversationQuery = (id) => `{
    conversation(id: "${id}"){
        participants,
        messages {
          name,
          message
        }
        }
    }`;

// MAX'S HOOKS TUTORIAL FOR CARRO
// this.state = {
//    conversations:[]
// }

function MessageWindow(props) {
  const [state, setState] = useState({ conversation: [] });

  const fetchConversation = () => {
    if (props.conversationId) {
    apolloFetch({
      query: getConversationQuery(props.conversationId),
    })
      .then((res) => {
        setState({ conversation: res.data.conversation.messages });
      });
    }
  };
  useEffect(() => {
    const foo = setInterval(() => {
      fetchConversation();
    }, 1000);

    return () => {
      clearInterval(foo)
    }
  }, [props]);

  return (
    <div className="chat-container" >
      <section className="message-container">
        {state.conversation.map((el) => (
          <div>
            <p>{el.name}</p>
            <p>{el.message}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MessageWindow;
