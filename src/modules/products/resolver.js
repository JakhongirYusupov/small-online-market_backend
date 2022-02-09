import model from "../../utils/postgres.js"
import MODELS from './model.js'

export default {
    Query: {
        products: async () => await model(MODELS.SELECT)
    }
}