import { GraphQLScalarType, Kind } from "graphql";

const uploadscalar = new GraphQLScalarType({
    name: 'Upload',
    description: 'Date custom scalar type',
    serialize: test,
    parseValue: test
});

function test({ file }) {
    const { filename, mimetype, encoding } = file
    const types = ['image/jpeg', 'image/jpg', 'image/png']
    if (!types.includes(mimetype)) throw new Error("File must be jpeg or png!")
    return file
}

export default {
    Upload: uploadscalar
}