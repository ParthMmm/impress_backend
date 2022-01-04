const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeResolvers } = require('@graphql-tools/merge');

const authSchema = require('./auth');

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
  typeDefs: [
    authSchema.typeDefs, // First defines the type Query
  ],
  resolvers: mergeResolvers(authSchema.resolvers),
});

export default schema;
