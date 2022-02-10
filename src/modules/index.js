import { makeExecutableSchema } from "@graphql-tools/schema";

import CategoryModule from './categories/index.js'
import TypesModule from './types/index.js'
import ProdectModule from './products/index.js'
import OrderModule from "./orders/index.js";


export default makeExecutableSchema({
    typeDefs: [
        CategoryModule.typeDefs,
        ProdectModule.typeDefs,
        TypesModule.typeDefs,
        OrderModule.typeDefs
    ],
    resolvers: [
        CategoryModule.resolvers,
        ProdectModule.resolvers,
        TypesModule.resolvers,
        OrderModule.resolvers
    ]
})