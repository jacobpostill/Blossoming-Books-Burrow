const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find().populate('thoughts');
    // },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate('thoughts');
    // },
    // thoughts: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Thought.find(params).sort({ createdAt: -1 });
    // },
    // thought: async (parent, { thoughtId }) => {
    //   return Thought.findOne({ _id: thoughtId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }, contextt) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Something is wrong!');}
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, username, password }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, body, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: input } },
              { new: true, runValidators: true }
            );
            return updatedUser;
          }
    
          throw new AuthenticationError("You need to be logged in!");
        },
    
    removeBook: async (parent,  {bookId} , context) => {
        if (context.user) {
          console.log('inremove');
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  };
  
  module.exports = resolvers;