import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
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
    }`

// MAX'S HOOKS TUTORIAL FOR CARRO
// this.state = {
//    conversations:[]
// }

function Chat() {
    const [state, setState] = useState({ conversation: [] });

    useEffect(() => {
        apolloFetch({
            query: getConversationQuery(),
          })
          .then(res => {
            setState({ conversation: [...res.data.conversation] });
          })

    }, [])

    return (
        <div className="chat-container">
            <section className="message-container">
                {state.conversation.map(el => <div><p>{el.name}</p> <p>{el.message}</p></div>)}
            </section>
            <Form>
                <FormGroup>
                    <Label for="exampleText"></Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default Chat;
