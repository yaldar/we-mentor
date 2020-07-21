const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql', graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

// Matchbar - matching algorithm in the server which reflect the current profile status.

// app.POST('api/:userid/') - update user info & creates matchingArray & store it in db somewhere
