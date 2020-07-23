const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://fanny_petersen:Numerouno@cluster0.m7tv4.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true },
);

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database');
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

// Matchbar - matching algorithm in the server which reflect the current profile status.

// app.POST('api/:userid/') - update user info & creates matchingArray & store it in db somewhere
