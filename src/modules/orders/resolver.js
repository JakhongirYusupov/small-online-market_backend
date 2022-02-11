import model from "../../utils/postgres.js"
import MODELS from './model.js'
import { sign, verify } from "../../utils/jsonwebtoken.js"

export default {
    Query: {
        orders: async (_, { pagination: { page, limit } }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USERADMIN, user.user_id, user.user_name)
                        if (data) {

                            const orders = await model(MODELS.SELECT)
                            if (!orders) return "Not found any orders!"

                            return orders.slice(page * limit - limit, page * limit)
                        }
                    }
                }

                return "You cannot see all order bacause you are not admin!"


            } catch (error) {
                console.log(error);
            }
        },

        seeownorder: async (_, { order_id, pagination: { page, limit } }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const order = await model(MODELS.OWNORDER, data.user_id)
                            console.log(order);
                            if (order) {
                                return order.slice(page * limit - limit, page * limit)
                            }
                            return "Not found any orders"
                        }
                    }
                }

                return "Before login or register!"
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

                            const [paidorder] = await model(MODELS.PAIDORDER, data.user_id)
                            if (paidorder) return {
                                message: "You have already order. If you want new order pay your old order"
                            }

                            const [order] = await model(MODELS.INSERTORDER, data.user_id)
                            console.log(order);
                            if (!order) {
                                return { message: "Order do not added" }
                            }
                            return {
                                message: "Order added successfull!",
                                data: order
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

        addorderproduct: async (_, { order_id, product_id }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const [order] = await model(MODELS.ISPAYORDER, order_id, data.user_id)
                            if (order) {
                                const [res] = await model(MODELS.INSERTORDERPRODUCT, order_id, product_id)
                                return {
                                    message: "Order's product added",
                                    data: res
                                }
                            }
                            return {
                                message: "Order not found"
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

        deleteorder: async (_, { order_id }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const [order] = await model(MODELS.ISPAYORDER, order_id, data.user_id)
                            if (order) {
                                await model(MODELS.DELETE, order_id, data.user_id)
                                return {
                                    message: "Order deleted successfull!"
                                }
                            }
                            return { message: "Order not found or you already paid to this order" }
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

        deleteorderproduct: async (_, { order_id, product_id }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const [order] = await model(MODELS.ISPAYORDER, order_id, data.user_id)
                            if (order) {
                                const [deleteorderproduct] = await model(MODELS.DELETEORDERPRODUCT, order_id, product_id)
                                if (!deleteorderproduct) {
                                    return { message: "Order's product not found" }
                                }
                                return {
                                    message: "Order's product deleted successfull!"
                                }
                            }
                            return { message: "Order not found" }
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
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)
                        if (data) {
                            const [order] = await model(MODELS.ISPAYORDER, order_id, data.user_id)
                            if (!order) {
                                return "Not found this orders"
                            }
                            await model(MODELS.PAYORDER, order_id)
                            return "Order paid successfull!"
                        }
                    }
                }

                return "You don't paid. Before login or register!"
            } catch (error) {
                console.log(error);
            }
        }
    }
}