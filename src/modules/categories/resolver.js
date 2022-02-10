import { sign, verify } from "../../utils/jsonwebtoken.js";
import model from "../../utils/postgres.js"
import MODELS from './model.js'



export default {
    Query: {
        categories: async (_, { pagination: { page, limit } }) => {
            try {
                const data = await model(MODELS.SELECT)
                return data.slice(page * limit - limit, page * limit)
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        addcategory: async (_, { category_name }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.LOGIN, user.user_id, user.user_name)
                        if (data) {
                            const [data] = await model(MODELS.INSERT, category_name)
                            return {
                                message: "Category added successfull!",
                                data
                            }
                        }
                    }
                }

                return { message: "You are not admin" }


            } catch (error) {
                console.log(error);
            }
        },

        editcategory: async (_, { category_id, category_name }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.LOGIN, user.user_id, user.user_name)
                        if (data) {

                            const [data] = await model(MODELS.UPDATE, category_name, category_id)
                            return {
                                message: "Category updated successfull!",
                                data
                            }

                        }
                    }
                }

                return { message: "You are not admin" }

            } catch (error) {
                console.log(error);
            }
        },

        deletecategory: async (_, { category_id }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.LOGIN, user.user_id, user.user_name)
                        if (data) {

                            const [res] = await model(MODELS.DELETE, category_id)
                            if (!res) return {
                                message: "Category not found"
                            }

                            return {
                                message: "Category deleted successfull!"
                            }

                        }
                    }
                }

                return { message: "You are not admin" }

            } catch (error) {
                console.log(error);
            }
        }

    }
}