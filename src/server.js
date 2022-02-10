import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';

import '../config.js'
import schema from './modules/index.js'
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import { join } from 'path'
import http from 'http';


; (async function startApolloServer() {
    const app = express();

    app.use(express.static(join(process.cwd(), 'src', 'uploads')))
    app.use(graphqlUploadExpress())

    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        context: ({ req }) => {
            return req.headers
        },
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})()