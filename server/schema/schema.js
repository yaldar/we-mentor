const User = require('../models/user');

const { GraphQLList, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

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
        console.log(userTechnologies);
        const userStack = user.preferences.stack;
        const userYears = user.preferences.years;
        const dbResponse = await User.find({
          role: { $ne: user.role },
          years: userYears,
          city: userCity,
          stack: userStack,
        }).exec();
        const matchedArray = dbResponse.filter(e => {
          const technologies = e.technologies[0].split(',');
          for (let i = 0; i < technologies.length; i++) {
            if (userTechnologies.includes(technologies[i])) {
              return true;
            }
          }
        });
        const idArray = matchedArray.map(el => el.linkedin_id);
        return idArray;
      },
    },
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
          },
        });
        return user.save();
      },
    },
    
    
    // updateUser: {
    //   type: UserType,
    //   args: {
    //     linkedin_id: { type: GraphQLString },
    //     name: { type: GraphQLString },
    //     bio: { type: GraphQLString },
    //     city: { type: GraphQLString },
    //     years: { type: GraphQLString },
    //     technologies: { type: new GraphQLList(GraphQLString) },
    //     stack: { type: GraphQLString },
    //     current_job: { type: GraphQLString },
    //     role: { type: GraphQLString },
    //     pref_city: { type: GraphQLString },
    //     pref_years: { type: GraphQLString },
    //     pref_technologies: { type: new GraphQLList(GraphQLString) },
    //     pref_stack: { type: GraphQLString },
    //   },
    //   resolve(parent, args) {
    //     let user = User.findOne({ linkedin_id: args.linkedin_id });
    //     user.name = args.name;
    //       user.bio = args.bio;
    //       user.city = args.city,
    //       user.years = args.years,
    //       user.technologies = args.technologies,
    //       user.stack = args.stack,
    //       user.current_job = args.current_job,
    //       user.role = args.role,
    //       user.preferences = {
    //         city: args.pref_city,
    //         years: args.pref_years,
    //         technologies: args.pref_technologies,
    //         stack: args.pref_stack,
    //       };
    //     return user.save();
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
