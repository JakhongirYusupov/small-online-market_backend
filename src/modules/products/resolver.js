import { sign, verify } from "../../utils/jsonwebtoken.js"
import model from "../../utils/postgres.js"
import MODELS from './model.js'
import path from 'path'
import fs from 'fs'

export default {
    Query: {
        products: async (_, { pagination: { page, limit } }) => {
            try {
                const data = await model(MODELS.SELECT)
                return data.slice(page * limit - limit, page * limit)
            } catch (error) {
                console.log(error)
            }
        },

        searchproducts: async (_, { product_name, pagination: { page, limit } }) => {
            try {
                const data = await model(MODELS.SEARCH, product_name)
                return data.slice(page * limit - limit, page * limit)

            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        addproduct: async (_, { category_id, product_name, product_price, product_short_desc, product_long_desc, file }, context) => {
            try {

                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USERADMIN, user.user_id, user.user_name)
                        if (data) {
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

                        }
                    }
                }

                return { message: "You are not admin" }

            } catch (error) {
                console.log(error);
            }
        },

        deleteproduct: async (_, { product_id }, context) => {
            try {
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USERADMIN, user.user_id, user.user_name)
                        if (data) {

                            const [data] = await model(MODELS.DELETE, product_id)
                            if (!data) return { message: "Product not found!" }

                            const filePath = path.join(process.cwd(), 'src', 'uploads', data.product_picture)
                            fs.unlinkSync(filePath);

                            return { message: "Product deleted successfull!" }

                        }
                    }
                }

                return { message: "You are not admin" }

            } catch (error) {
                console.log(error);
                return error
            }
        },

        editproduct: async (_, { category_id, product_name, product_price, product_short_desc, product_long_desc, file, product_id }, context) => {
            try {

                await file
                if (context.token) {
                    const user = verify(context.token)
                    if (user) {
                        const [data] = await model(MODELS.USERADMIN, user.user_id, user.user_name)
                        if (data) {

                            if (file) {
                                const { createReadStream, filename, mimetype, encoding } = await file
                                const [imageAddress] = await model(MODELS.GETPRODUCTIMAGE, product_id)

                                if (imageAddress.product_picture != filename) {

                                    const stream = createReadStream()
                                    const fileAddress = path.join(process.cwd(), 'src', 'uploads', filename)
                                    const out = fs.createWriteStream(fileAddress)
                                    stream.pipe(out)
                                }

                                const [data] = await model(MODELS.UPDATE, category_id, product_name, product_price, product_short_desc, product_long_desc, filename, product_id)
                                if (!data) return { message: "Product not found!" }

                                return {
                                    message: "Product updated successfull!",
                                    data
                                }
                            }

                            const [data] = await model(MODELS.UPDATE, category_id, product_name, product_price, product_short_desc, product_long_desc, null, product_id)
                            if (!data) return { message: "Product not found!" }

                            return {
                                message: "Product updated successfull!",
                                data
                            }
                        }
                    }
                }
                return { message: "You are not admin" }

            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
}