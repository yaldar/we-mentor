const User = require('../models/user');

const {
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

// users database
// const users = [
//   {
//     id: '1',
//     name: 'Carol Baskin',
//     bio: 'I am a lovely WOMAN in tech looking for an equally female mentor',
//     city: 'Stockholm',
//     years: '0',
//     field: 'Fintech',
//     stack: 'Front-end',
//     current_job: '',
//     role: 'Mentee',
//     preferences: {
//       city: 'Stockholm',
//       years: '5',
//       field: 'front-end',
//       stack: 'React',
//     }
//   },
//   {
//     id: '2',
//     name: 'Fanny fanelia',
//     bio: 'I am a lovely WOMAN in tech looking for an almost as equally female mentor (but not really bothered)',
//     city: 'Svensk countryside',
//     years: '0',
//     field: 'Femtech',
//     stack: 'Full-stack',
//     current_job: 'Junior Technical Manager at Electrolux',
//     role: 'Mentee',
//     preferences: {
//       city: 'Oslo',
//       years: '3',
//       field: 'back-end',
//       stack: 'Php',
//     }
//   },
//   {
//     id: '3',
//     name: 'Berta',
//     bio: 'Im the best ingen protest (snel hest)',
//     city: 'Stockholm',
//     years: '5',
//     field: 'front-end',
//     stack: 'React',
//     current_job: 'Senior something at Spotify',
//     role: 'Mentor',
//     preferences: {
//       city: 'Stockholm',
//       years: '5',
//       field: 'front-end',
//       stack: 'React',
//     }
//   },
//   {
//     id: '4',
//     name: 'Barol Caskin',
//     bio: 'I am a lovely WOMAN in tech looking for an equally female mentor',
//     city: 'Stockholm',
//     years: '0',
//     field: 'Fintech',
//     stack: 'Front-end',
//     current_job: 'Senior at Senior',
//     role: 'Mentor',
//     preferences: {
//       city: 'Stockholm',
//       years: '5',
//       field: 'front-end',
//       stack: 'React',
//     }
//   },
//   {
    // id: '5',
    // name: 'Matilda',
    // bio: 'I am a lovely WOMAN in tech looking for an equally female mentor',
    // city: 'Stockholm',
    // years: '5',
    // field: 'front-end',
    // stack: 'React',
    // current_job: 'Head of Bla',
    // role: 'Mentor',
    // preferences: {
    //   city: 'Stockholm',
    //   years: '5',
    //   field: 'front-end',
    //   stack: 'React',
//     }
//   },
// ];


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
    linkedin_id: { type: GraphQLString },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    city: { type: GraphQLString },
    years: { type: GraphQLString },
    technologies: { type: new GraphQLList(GraphQLString) },
    stack: { type: GraphQLString },
    current_job: { type: GraphQLString },
    role: { type: GraphQLString },
    preferences: { type: PreferenceType },

  }),
});

const PreferenceType = new GraphQLObjectType({
  name: 'Preferences',
  fields: () => ({
    linkedin_id: { type: GraphQLString },
    city: { type: GraphQLString },
    years: { type: GraphQLString },
    technologies: { type: new GraphQLList(GraphQLString) },
    stack: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
        // return users.find(el => el.id === args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({linkedin_id: args.id});
        // return users.find(el => el.id === args.id);
      },
    },
    matches: {
      type: new GraphQLList(GraphQLString),
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
      const user = await User.findOne({linkedin_id: args.id}).exec();
      const userCity = user.preferences.city;
      const userTechnologies = user.preferences.technologies;
      const userStack = user.preferences.stack;
      const userYears = user.preferences.years;
      const dbResponse = await User.find({ role: {$ne: user.role}, years: userYears, city: userCity, stack: userStack }).exec();
      const matchedArray = dbResponse.filter(e => {
        for (let i = 0; i < e.technologies.length; i++){
          if(userTechnologies.includes(e.technologies[i])){
            return true; 
          }
        }
      });
      const idArray = matchedArray.map(el => el.linkedin_id);
      return idArray;
      }
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        linkedin_id: { type: GraphQLString },
        name: { type: GraphQLString },
        bio: { type: GraphQLString },
        city: { type: GraphQLString },
        years: { type: GraphQLString },
        technologies: { type: new GraphQLList(GraphQLString) },
        stack: { type: GraphQLString },
        current_job: { type: GraphQLString },
        role: { type: GraphQLString },
        pref_city: { type: GraphQLString },
        pref_years: { type: GraphQLString },
        pref_technologies: { type: new GraphQLList(GraphQLString) },
        pref_stack: { type: GraphQLString }, 
      },
      resolve(parent, args) {
        let user = new User({
          linkedin_id: args.linkedin_id,
          name: args.name,
          bio: args.bio,
          city: args.city,
          years: args.years,
          technologies: args.technologies,
          stack: args.stack,
          current_job: args.current_job,
          role: args.role,
          preferences: {
            city: args.pref_city,
            years: args.pref_years,
            technologies: args.pref_technologies,
            stack: args.pref_stack,
          }
        });
        return user.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
