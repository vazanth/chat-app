import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const typesArray = fileLoader(`${__dirname}/typedefs/**`);
const resolversArray = fileLoader(`${__dirname}/resolvers/**`);

export const typeDefs = mergeTypes(typesArray, { all: true });

export const resolvers = mergeResolvers(resolversArray);

const graphqlSchema = {
  typeDefs,
  resolvers,
};

export default graphqlSchema;