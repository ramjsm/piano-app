const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Some song title',
        duration: 10,
        keysPlayed: [ {id: 1, note: 'C1', time: 1}]
    }
];

const keys = [
    {
        id: 1,
        note: 'C1',
        time: 1
    }
];

// 
// type Key {                // Model added to store keys
//       id: ID!
//       note: String
//       time: Float
//   }

//  type Song {
//       id: ID!
//       title: String
//       duration: Float     // New field to track time in svg canvas
//       keysPlayed: [Key]!  // Relation with keys
//   }

const typeDefs = gql`

    type Key {
        id: ID!
        note: String
        time: Float
    }

    type Song {
        id: ID!
        title: String
        duration: Float     
        keysPlayed: [Key]! 
    }

    type Query {
        songs: [Song]
        keys: [Key]
    }

    type Mutation {
        addSong(title: String, duration: Float, keysPlayed: [ID!]): Song
        addKey(note: String, time: Float) : Key
    }
`

const resolvers = {
    Query: {
        songs: () => songs,
        keys: () => keys
    },
    Mutation: {
        addSong: (_, { title, duration, keysPlayed }) => {

            const newSong = { 
                id: songs.length + 1,
                title,
                duration
            };

            const newKeys = keysPlayed.map((id) => keys.find(key => {return key.id == id}))
            newSong.keysPlayed = newKeys;
            songs.push(newSong);

            return newSong;
        },

        addKey: (_, { note, time }) => {

            const newKey = {
                id: keys.length + 1,
                note,
                time
            }

            keys.push(newKey);

            return newKey;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Apollo server running: ${url}`);
});
