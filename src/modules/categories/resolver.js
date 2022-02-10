import model from "../../utils/postgres.js"
import MODELS from './model.js'
export default {
    Query: {
        categories: async () => {
            try {
                return await model(MODELS.SELECT)
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        addcategory: async (_, { category_name }) => {
            try {
                const [data] = await model(MODELS.INSERT, category_name)
                return {
                    message: "Category added successfull!",
                    data
                }
            } catch (error) {
                console.log(error);
            }
        },

        editcategory: async (_, { category_id, category_name }) => {
            try {
                const [data] = await model(MODELS.UPDATE, category_name, category_id)
                return {
                    message: "Category updated successfull!",
                    data
                }
            } catch (error) {
                console.log(error);
            }
        },

        deletecategory: async (_, { category_id }) => {
            try {
                const [res] = await model(MODELS.DELETE, category_id)
                if (!res) return {
                    message: "Category not found"
                }

                return {
                    message: "Category deleted successfull!"
                }
            } catch (error) {
                console.log(error);
            }
        }

    }
}