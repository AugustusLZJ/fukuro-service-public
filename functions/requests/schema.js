import { gql } from "apollo-server-lambda";

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Post {
    id: ID!
    userId: ID!
    title: String!
    content: String!
    latitude: Int!
    longitude: Int!
    createAt: String!
  }
  
  type Query {
    hello: String
    getPost (id: ID): [Post]
    getPosts (latitude: Int, longitude: Int, distance: Int): [Post]
  }
  
  type Mutation {
    createPost(id:        ID!,
               userId:    ID!,
               content:   String!,
               createdAt:  Int!,
               meetDate: Int!,
               meetTime:  String!,
               tipsType: Int!,
               tipsAmount: Int!): Boolean
               
    editPost(  id:        ID, 
               userId:    ID, 
               title:     String, 
               content:   String, 
               latitude:  Int,
               longitude: Int,
               createAt:  String): Boolean
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => 'Hello from Customer!!',
    getPost: async (source, { id }, { dataSources }) => {
      return await dataSources.customersPosts.getPost(id);
    },
    getPosts: async (source, { id }, { dataSources }) => {
      return await dataSources.customersPosts.getUser(id);
    },
  },
  Mutation: {
    createPost: async (source, args, { dataSources }) => {
      return await dataSources.customersPosts.putPost(args)
        // .putPost(args.id, args.userId, args.content, args.latitude,
        //          args.longitude, args.createAt);
    },
    editPost: async (source, args, { dataSources }) => {
      return await dataSources.customersPosts.putPost(args)
    }
  }
};