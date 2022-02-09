import { makeExecutableSchema } from "@graphql-tools/schema";

import CategoryModule from './categories/index.js'


export default makeExecutableSchema({
    typeDefs: [
        CategoryModule.typeDefs
    ],
    resolvers: [
        CategoryModule.resolvers
    ]
})