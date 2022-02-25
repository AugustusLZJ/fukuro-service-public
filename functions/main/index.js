import UsersAPI from "./database/users";
import { ApolloServer, gql } from "apollo-server-lambda";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createAt: String!
  }
  
  type Query {
    hello: String
    getUser(id: String): User
  }
  
  type Mutation {
    createUser(id: String, name: String, email: String, createAt: String): Boolean
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo!!',
    getUser: async (_source, { id }, { dataSources }) => {
      return await dataSources.usersAPI.getUser(id);
    },
  },
  Mutation: {
    createUser: async (source, args, { dataSources }) => {
      return await dataSources.usersAPI
        .putUser(args.id, args.name, args.email, args.createAt);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => {
    // console.log({event});
    return ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    })
  },

  dataSources: () => {
    let options = {};
    if (process.env.IS_OFFLINE) {
      options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      };
    }
    return {
      usersAPI: new UsersAPI(process.env.USER_TABLE, options)
    };
  },

  playground: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});