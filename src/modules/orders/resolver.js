import model from "../../utils/postgres.js"
import MODELS from './model.js'
import { sign, verify } from "../../utils/jsonwebtoken.js"

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
        },

        seeownorder: async (_, { order_id, pagination: { page, limit } }) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const order = await model(MODELS.OWNORDER, order_id, data.user_id)
                            if (order) {
                                return order.slice(page * limit - limit, page * limit)
                            }
                            return "Not found this orders"
                        }
                    }
                }

                return {
                    message: "Before login or register!"
                }
            } catch (error) {
                console.log(error);
            }
        }

    },

    Mutation: {
        addorder: async (_, args, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const [data] = await model(MODELS.INSERTORDER, data.user_id)
                            if (!data) {
                                return { message: "Order do not added" }
                            }

                            return {
                                message: "Order added successfull!",
                                data
                            }
                        }
                    }
                }

                return {
                    message: "Before login or register!"
                }

            } catch (error) {
                console.log(error);
            }
        },

        addorderproduct: async (_, { order_id, product_id }) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const [data] = await model(MODELS.INSERTORDERPRODUCT, order_id, product_id)
                            if (!data) {
                                return { message: "Order's product did not add" }
                            }

                            return {
                                message: "Order's product added",
                                data
                            }
                        }
                    }
                }

                return {
                    message: "Before login or register!"
                }


            } catch (error) {
                console.log(error);
            }
        },

        deleteorder: async (_, { order_id }) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {

                            const [deletedata] = await model(MODELS.DELETE, order_id, data.user_id)

                            if (!deletedata) {
                                return { message: "Order not found or you already paid to this order" }
                            }

                            return {
                                message: "Order deleted successfull!"
                            }

                        }
                    }
                }

                return {
                    message: "Before login or register!"
                }


            } catch (error) {
                console.log(error);
            }
        },

        deleteorderproduct: async (_, { order_id, product_id }) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    console.log(user);
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {

                            const [deleteorderproduct] = await model(MODELS.DELETEORDERPRODUCT, order_id, product_id)

                            if (!deleteorderproduct) {
                                return { message: "Order's product not found" }
                            }

                            return {
                                message: "Order's product deleted successfull!"
                            }

                        }
                    }
                }

                return {
                    message: "You don't paid. Before login or register!"
                }


            } catch (error) {
                console.log(error);
            }
        },

        payorder: async (_, { order_id }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    console.log(user);
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const order = await model(MODELS.OWNORDER, order_id, data.user_id)
                            if (order) {
                                return await model(MODELS.PAYORDER, order_id)
                            }
                            return "Not found this orders"
                        }
                    }
                }

                return {
                    message: "You don't paid. Before login or register!"
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}