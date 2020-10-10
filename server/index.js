const { ApolloServer, gql } = require('apollo-server')

const todos = [
  {
    task: 'Wash car',
    completed: false,
  },
  {
    task: 'Clear room',
    completed: true,
  },
]

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Todo" type defines the queryable fields for every book in our data source.
  type Todo {
    task: String
    completed: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "allTodos" query returns an array of zero or more Todos (defined above).
  type Query {
    allTodos: [Todo]
  }
`

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    allTodos: () => todos,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
