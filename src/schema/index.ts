const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeResolvers } = require('@graphql-tools/merge');

const authSchema = require('./auth');
const accessoriesSchema = require('./accessories');
const postSchema = require('./post');
// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
  typeDefs: [
    authSchema.typeDefs, // First defines the type Query
    accessoriesSchema.typeDefs,
    postSchema.typeDefs,
  ],
  resolvers: [
    authSchema.resolvers,
    accessoriesSchema.resolvers,
    postSchema.resolvers,
  ],
});

export default schema;
