import model from "../../utils/postgres.js"
import MODELS from './model.js'


export default {
    Query: {
        orders: async () => {
            try {
                const data = await model(MODELS.SELECT)
                if (!data) return ["Not found any orders!"]
                return data
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        addorder: async (_, { user_id }) => {
            try {
                const [data] = await model(MODELS.INSERTORDER, user_id)
                if (!data) {
                    return { message: "Order do not added" }
                }

                return {
                    message: "Order added successfull!",
                    data
                }
            } catch (error) {
                console.log(error);
            }
        },

        addorderproduct: async (_, { order_id, product_id }) => {
            try {
                const [data] = await model(MODELS.INSERTORDERPRODUCT, order_id, product_id)
                if (!data) {
                    return { message: "Order's product did not add" }
                }

                return {
                    message: "Order's product added",
                    data
                }
            } catch (error) {
                console.log(error);
            }
        },

        deleteorder: async (_, { order_id }) => {
            try {
                const [data] = await model(MODELS.DELETE, order_id)

                if (!data) {
                    return { message: "Order not found or you already paid to this order" }
                }

                return {
                    message: "Order deleted successfull!"
                }
            } catch (error) {
                console.log(error);
            }
        },

        deleteorderproduct: async (_, { order_id, product_id }) => {
            try {
                const [data] = await model(MODELS.DELETEORDERPRODUCT, order_id, product_id)

                if (!data) {
                    return { message: "Order's product not found" }
                }

                return {
                    message: "Order's product deleted successfull!"
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}