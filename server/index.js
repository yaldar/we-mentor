const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

mongoose.connect(
  'mongodb+srv://fanny_petersen:Numerouno@cluster0.m7tv4.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true },
);

const app = express();

app.use(cors());

const redirectUri = 'http://localhost:4000/callback';
const clientId = '78va9p9a58k2jg';
const clientSecret = 'pNxSXZYL2e4z9uhG';
const state = 'numerouno'

app.get('/login', (req, res) => {
  const qs = `response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=r_liteprofile%20r_emailaddress`;
  res.redirect(`https://www.linkedin.com/oauth/v2/authorization?${qs}`);
});

app.get('/callback', async (req, res) => {
  const body = `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;

  const options = {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', options).then(response =>
    response.json(),
  );

  res.cookie('accessToken', response.access_token);
  res.redirect('http://localhost:3000');
});


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
