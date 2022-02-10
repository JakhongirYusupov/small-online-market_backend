import model from "../../utils/postgres.js"
import MODELS from "./model.js"
import { sign, verify } from "../../utils/jsonwebtoken.js";


export default {
    Mutation: {
        register: async (_, { user_name, user_password, user_contact, user_email }, context) => {
            if (context.token) {
                const user = verify(context.token)
                const [data] = await model(MODELS.USER, user.user_id, user.user_name)

                if (data) {
                    return {
                        message: "You are already registered!",
                        token: context.token,
                        data
                    }
                }
            }
            const [data] = await model(MODELS.REGISTER, user_name, user_password, user_contact, user_email)

            if (!data) return { message: "User did not add" }

            return {
                message: "User added successfull!",
                token: sign(data),
                data
            }
        }
    }
}