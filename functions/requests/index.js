import { ApolloServer, gql } from "apollo-server-lambda"
import PostsAPI from "./postsAPI"

const typeDefs = gql`
  type Post {
    id: ID!
    userId: ID!
    content: String!
    createAt: String!
    meetDate:  Int!
    meetTime:  String!
    tipsType:  Int!
    tipsAmount: Int!
  }
  
  type Query {
    hello: String
    getPost(id: String): Post
  }
  
  type Mutation {
    createPost(id: ID,
               userId: ID,
               content: String,
               createdAt: Int,
               meetDate:  Int,
               meetTime:  String,
               tipsType:  Int,
               tipsAmount: Int): Post
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello from requests!!',
    getPost: async (_source, { id }, { dataSources }) => {
      return await dataSources.requestPosts.getPost(id)
    },
  },
  Mutation: {
    createPost: async (source, args, { event, dataSources }) => {

      let accountId = event.requestContext.accountId
      console.log({accountId})
      let userId = accountId || "12134"
      let createdAt = Date.now()
      let id = Number(userId).toString(16) + "h" + createdAt.toString(16)
      return await dataSources.requestPosts
        .putPost(id, userId, args.content, createdAt, args.meetDate,
                 args.meetTime, args.tipsType, args.tipsAmount)
    }
  }
}

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
      }
    }
    const posts = new PostsAPI(
      process.env.REQUESTS_POST_TABLE, options)
    return {
      requestPosts: posts
    }
  },

  playground: true,
})

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})