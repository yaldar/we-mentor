// all functionality for the database in here
const { GraphQLList, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

// users database
const users = [
  {
    id: '1',
    name: 'Carol Baskin',
    bio: 'I am a lovely WOMAN in tech looking for an equally female mentor',
    city: 'Stockholm',
    years: '0',
    field: 'Fintech',
    stack: 'Front-end',
    role: 'Mentee',
    // matches: [67, 38, 5, 1],
  },
  {
    id: '2',
    name: 'Fanny fanelia',
    bio: 'I am a lovely WOMAN in tech looking for an almost as equally female mentor (but not really bothered)',
    city: 'Svensk countryside',
    years: '0',
    field: 'Femtech',
    stack: 'Full-stack',
    role: 'Mentee',
    // matches: [41, 36, 22, 8],
  },
  {
    id: '3',
    name: 'Matilda',
    bio: 'I am a lovely WOMAN in tech looking for an equally female mentor',
    city: 'Stockholm',
    years: '0',
    field: 'Fintech',
    stack: 'Front-end',
    role: 'Mentor',
    // matches: [67, 38, 5, 1],
  },
  {
    id: '4',
    name: 'Barol Caskin',
    bio: 'I am a lovely WOMAN in tech looking for an equally female mentor',
    city: 'Stockholm',
    years: '0',
    field: 'Fintech',
    stack: 'Front-end',
    role: 'Mentor',
    // matches: [67, 38, 5, 1],
  },
];

// matches database
const matches = [
{
  id: "1",
  matchArray: 'I am a string'
},
{
  id: "2",
matchArray: [ 7, 34, 9, 70 ]
},
{
  id: "3",
matchArray: [ 7, 23, 42, 8 ]
},
{
  id: "4",
matchArray: [ 88, 41, 6, 3 ]
}
]



// template for how every User looks
// every user has these fields:
// id
// name
// short bio
// city
// industry/field
// years of experience (0, 1-3, 3-5, 5+)
// matching props - tech stack, language, etc
// matches = []
// profile type = mentor/mentee

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    city: { type: GraphQLString },
    years: { type: GraphQLInt },
    field: { type: GraphQLString },
    stack: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const MatchType = new GraphQLObjectType({
  name: 'matches',
  fields: {
    id: { type: GraphQLString },
    matchArray: { type: GraphQLString }
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return users.find(el => el.id === args.id);
      },
    },
    matches: {
      type: MatchType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return matches.find(el => el.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});


// yaldar, possible fix
// all functionality for the database in here
// const {
//   GraphQLList,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
// } = require('graphql');

// //dummy data users
// const users = [
//   {
//     id: '1',
//     name: 'Carol Baskin',
//     bio: 'I am a lovely WOMAN in tech looking for an equally female mentor',
//     matching_props: {
//       city: 'Stockholm',
//       years: '0',
//       field: 'Fintech',
//       stack: 'Front-end',
//       role: 'Mentee',
//     },
//     matches: [67, 38, 5, 1],
//   },

//   {
//     id: '2',
//     name: 'Fanny fanelia',
//     bio:
//       'I am a lovely WOMAN in tech looking for an almost as equally female mentor (but not really bothered)',
//     matching_props: {
//       city: 'Svensk countryside',
//       years: '0',
//       field: 'Femtech',
//       stack: 'Full-stack',
//       role: 'Mentee',
//     },
//     matches: [41, 36, 22, 8],
//   },
// ];

// // template for how every User looks
// // every user has these fields:
// // id
// // name
// // short bio
// // city
// // industry/field
// // years of experience (0, 1-3, 3-5, 5+)
// // matching props - tech stack, language, etc
// // matches = []
// // profile type = mentor/mentee

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     bio: { type: GraphQLString },
//     matching_props: {
//       type: match_props,
//     },
//     matches: { type: new GraphQLList(GraphQLInt) },
//   }),
// });

// const match_props = new GraphQLObjectType({
//   name: 'match',
//   fields: {
//     city: { type: GraphQLString },
//     years: { type: GraphQLInt },
//     field: { type: GraphQLString },
//     stack: { type: GraphQLString },
//     role: { type: GraphQLString },
//   },
// });

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     user: {
//       type: UserType,
//       args: { id: { type: GraphQLString } },
//       resolve(parent, args) {
//         return users.find(el => el.id === args.id);
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery,
// });
