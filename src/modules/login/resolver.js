import model from "../../utils/postgres.js"
import MODELS from "./model.js"
import { sign, verify } from "../../utils/jsonwebtoken.js";


export default {
    Query: {
        userlogin: async (_, { user_name, user_password }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USER, user.user_id, user.user_name)

                        if (data) {
                            return {
                                message: "You are already login!",
                                token: context.token,
                                data
                            }
                        }
                    }
                }
                const [data] = await model(MODELS.LOGIN, user_name, user_password)

                if (!data) return { message: "User did not found" }

                return {
                    message: "User login successfull!",
                    token: sign(data),
                    data
                }
            } catch (error) {
                console.log(error);
            }
        },

        adminlogin: async (_, { user_name, user_password }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USERADMIN, user.user_id, user.user_name)
                        if (data) {
                            return {
                                message: "You are already adminlogin!",
                                token: context.token,
                                data
                            }
                        }
                    }
                }
                const [data] = await model(MODELS.ADMIN, user_name, user_password)

                if (!data) return { message: "Admin did not found" }

                return {
                    message: "Admin login successfull!",
                    token: sign(data),
                    data
                }
            } catch (error) {
                console.log(error);
            }
        },

        statistics: async (_, args, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USERADMIN, user.user_id, user.user_name)
                        if (data) {
                            const statistics = await model(MODELS.STATISTICS)
                            if (statistics) return statistics
                            return { message: "Not foun any orders" }
                        }
                    }
                }

                return { message: "You are not admin. Before login admin!" }

            } catch (error) {
                console.log(error);
            }
        }
    }
}