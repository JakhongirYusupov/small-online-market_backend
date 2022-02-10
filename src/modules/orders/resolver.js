import model from "../../utils/postgres.js"
import MODELS from './model.js'


export default {
    Query: {
        orders: async () => {
            const data = await model(MODELS.SELECT)
            if (!data) return ["Not found any orders!"]
            return data
        }
    },

    Mutation: {
        addorder: async (_, { user_id }) => {
            const [data] = await model(MODELS.INSERTORDER, user_id)
            if (!data) {
                return { message: "Order do not added" }
            }

            return {
                message: "Order added successfull!",
                data
            }
        },

        addorderproduct: async (_, { order_id, product_id }) => {
            const [data] = await model(MODELS.INSERTORDERPRODUCT, order_id, product_id)
            if (!data) {
                return { message: "Order's product did not add" }
            }

            return {
                message: "Order's product added",
                data
            }
        },

        deleteorder: async (_, { order_id }) => {
            const [data] = await model(MODELS.DELETE, order_id)

            if (!data) {
                return { message: "Order not found or you already paid to this order" }
            }

            return {
                message: "Order deleted successfull!"
            }
        },

        deleteorderproduct: async (_, { order_id, product_id }) => {
            const [data] = await model(MODELS.DELETEORDERPRODUCT, order_id, product_id)

            if (!data) {
                return { message: "Order's product not found" }
            }

            return {
                message: "Order's product deleted successfull!"
            }
        }
    }
}