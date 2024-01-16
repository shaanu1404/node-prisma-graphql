import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './typeDefs';
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const resolvers = {
    Query: {
        songs: async (parent, args, ctx, info) => {
            const songs = await db.song.findMany()
            return songs;
        },
        singers: async (parent, args, ctx, info) => {
            const singers = await db.singer.findMany()
            return singers;
        },
        singer: async (parent, { id }, ctx, info) => {
            const singer = await db.singer.findUnique({ where: { id } })
            return singer;
        }
    },
    Song: {
        singer: async (parent, args, ctx, info) => {
            const singer = await db.singer.findUnique({ where: { id: parent.singer_id } })
            return singer;
        }
    },
    Singer: {
        async songs(parent, args, ctx, info) {
            const songs = await db.song.findMany({ where: { singer_id: parent.id } })
            return songs;
        }
    }
};

async function startGraphqlServer() {
    const server = new ApolloServer({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startGraphqlServer().catch(console.log)