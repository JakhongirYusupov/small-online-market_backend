import { makeExecutableSchema } from "@graphql-tools/schema"

import CategoryModule from './categories/index.js'
import RegisterModule from './register/index.js'
import ProdectModule from './products/index.js'
import OrderModule from "./orders/index.js"
import LoginModule from './login/index.js'
import TypesModule from './types/index.js'


export default makeExecutableSchema({
    typeDefs: [
        CategoryModule.typeDefs,
        RegisterModule.typeDefs,
        ProdectModule.typeDefs,
        OrderModule.typeDefs,
        LoginModule.typeDefs,
        TypesModule.typeDefs
    ],
    resolvers: [
        CategoryModule.resolvers,
        RegisterModule.resolvers,
        ProdectModule.resolvers,
        OrderModule.resolvers,
        LoginModule.resolvers,
        TypesModule.resolvers
    ]
})