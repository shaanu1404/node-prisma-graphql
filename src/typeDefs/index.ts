import gql from 'graphql-tag'

export const typeDefs = gql`
    type Song {
        id: ID!
        title: String!
        slug: String
        length: Int
        thumbnail: String
        singer_id: ID
        singer: Singer
    }

    type Singer {
        id: ID!
        name: String!
        stageName: String
        songs: [Song]
    }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    songs: [Song]
    singers: [Singer]
    singer(id: ID!): Singer
  }
`;