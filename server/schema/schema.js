const {
  GraphQLList, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt,
} = require('graphql');
const User = require('../models/user');

const conversations = [
  {
    id: 'conversation1',
    messages: [],
  },
  {
    id: 'conversation2',
    messages: [],
  },
];

let conversation1 = [
  {
    id: '1', // uuid
    name: 'Carro',
    message: 'Hello there! I am your new menteee!!',
  },
  {
    id: '2', // uuid
    name: 'Max',
    message: 'Oh no, i thought you would be a man :O',
  },
  {
    id: '3', // uuid
    name: 'Carro',
    message: 'Oh kuk',
  },
  {
    id: '4', // uuid
    name: 'Max',
    message: 'Balle. aja det är ok. allt bra? ',
  },
  {
    id: '5', // uuid
    name: 'Carro',
    message: 'Nej. Jag tycker inte om män >:-(',
  },
  {
    id: '6', // uuid
    name: 'Max',
    message: 'Im not a man, i  am a boy',
  },
  {
    id: '7', // uuid
    name: 'Carro',
    message: 'Gr8! I luv bois!! :D',
  },
];

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    message: { type: GraphQLString },
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    conversation: {
      type: new GraphQLList(MessageType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return conversation1;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({ linkedin_id: args.id });
      },
    },
    matches: {
      type: new GraphQLList(GraphQLString),
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const user = await User.findOne({ linkedin_id: args.id }).exec();
        const userCity = user.preferences.city;
        const userTechnologies = user.preferences.technologies[0].split(',');
        const userStack = user.preferences.stack;
        const userYears = user.preferences.years;
        const dbResponse = await User.find({
          role: { $ne: user.role },
          years: userYears,
          city: userCity,
          stack: userStack,
        }).exec();
        const matchedArray = dbResponse.filter((e) => {
          const technologies = e.technologies[0].split(',');
          for (let i = 0; i < technologies.length; i += 1) {
            return (userTechnologies.includes(technologies[i]));
          }
        });
        const idArray = matchedArray.map((el) => el.linkedin_id);
        return idArray;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMessage: {
      type: MessageType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        message: { type: GraphQLString },
      },
      resolve(parent, args) {
        conversation1 = [...conversation1, { id: args.id, name: args.name, message: args.message }];
        return conversation1;
      },
    },
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
        const user = new User({
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
          },
        });
        return user.save();
      },
    },

    updateUser: {
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
        // var query = { name: 'bourne' };
        // User.update(query, { name: 'jason bourne' }, options, callback);

        // // is sent as
        // Model.update(query, { $set: { name: 'jason bourne' } }, options, callback);

        return User.update(
          { linkedin_id: args.linkedin_id },
          {
            $set: {
              name: args.name,
              bio: args.bio,
              city: args.city,
              years: args.years,
              technologies: [...args.technologies],
              stack: args.stack,
              current_job: args.current_job,
              role: args.role,
              preferences: {
                city: args.pref_city,
                years: args.pref_years,
                technologies: [...args.pref_technologies],
                stack: args.pref_stack,
              },
            },
          },
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
