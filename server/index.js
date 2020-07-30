require("dotenv").config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const schema = require('./schema/schema');


mongoose.connect(
  'mongodb+srv://fanny_petersen:Numerouno@cluster0.m7tv4.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const app = express();

app.use(cors());
app.use(cookieParser());

const redirectUri = 'http://localhost:4000/callback/';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const state = 'numerouno';

app.get('/login', (req, res) => {
  const qs = `response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=r_liteprofile%20r_emailaddress`;
  res.redirect(`https://www.linkedin.com/oauth/v2/authorization?${qs}`);
});

app.get('/callback', async (req, res) => {
  const body = `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;

  const options = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', options).then((data) => data.json());

  res.cookie('accessToken', response.access_token);
  res.redirect('http://localhost:3000');
});

app.get('/checkuser', async (req, response) => {
  const userData = await fetch('https://api.linkedin.com/v2/me', {
    mode: 'cors',
    Connection: 'Keep-Alive',
    headers: { Authorization: `Bearer ${req.cookies.accessToken}` },
  }).then((res) => res.json());
  response.header('Access-Control-Allow-origin', 'http://localhost:3000');
  response.header('Access-Control-Allow-Credentials', 'true');
  response.json(userData);
});

// app.get('/profilepicture/:token', async (req, response) => {
//   const url = 'https://media.licdn.com/dms/image/C4E03AQFXOCQI6Huk6g/profile-displayphoto-shrink_100_100/0?e=1526940000&v=alpha&t=12345';
//   const userData = await fetch(url, {
//     mode: 'cors',
//     Connection: 'Keep-Alive',
//     headers: { Authorization: `Bearer ${req.params.accessToken}` },
//   }).then((res) => res.text()).then(res => console.log(res));
//   response.header('Access-Control-Allow-origin', 'http://localhost:3000');
//   response.header('Access-Control-Allow-Credentials', 'true');
//   response.send(userData);
// });

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
