import model from "../../utils/postgres.js"
import MODELS from './model.js'
export default {
    Query: {
        categories: async () => await model(MODELS.SELECT)
    },

    Mutation: {
        addcategory: async (_, { category_name }) => {

            const [data] = await model(MODELS.INSERT, category_name)
            return {
                message: "Category added successfull!",
                data
            }
        },

        editcategory: async (_, { category_id, category_name }) => {
            const [data] = await model(MODELS.UPDATE, category_name, category_id)
            return {
                message: "Category updated successfull!",
                data
            }
        },

        deletecategory: async (_, { category_id }) => {
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