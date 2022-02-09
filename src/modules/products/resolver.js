import model from "../../utils/postgres.js"
import MODELS from './model.js'
import path from 'path'
import fs from 'fs'

export default {
    Query: {
        products: async () => await model(MODELS.SELECT)
    },

    Mutation: {
        addproduct: async (_, { category_id, product_name, product_price, product_short_desc, product_long_desc, file }) => {

            const { createReadStream, filename, mimetype, encoding } = await file

            const stream = createReadStream()
            const fileAddress = path.join(process.cwd(), 'src', 'uploads', filename)
            const out = fs.createWriteStream(fileAddress)
            stream.pipe(out)

            const [data] = await model(MODELS.INSERT, category_id, product_name, product_price, product_short_desc, product_long_desc, filename)
            return {
                message: "Product added successfull!",
                data
            }
        },

        deleteproduct: async (_, { product_id }) => {
            const [data] = await model(MODELS.DELETE, product_id)
            if (!data) return { message: "Product not found!" }

            const filePath = path.join(process.cwd(), 'src', 'uploads', data.product_picture)
            fs.unlinkSync(filePath);

            return { message: "Product deleted successfull!" }
        }
    }
}