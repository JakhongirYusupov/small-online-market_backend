import { GraphQLScalarType, Kind } from "graphql";

/////////// CHECK UPLOAD FILE
const uploadscalar = new GraphQLScalarType({
    name: 'Upload',
    description: 'You can be upload image.jpeg(jpg) or image.png this type',
    serialize: test,
    parseValue: test
});

function test({ file }) {
    const { filename, mimetype, encoding } = file
    const types = ['image/jpeg', 'image/jpg', 'image/png']
    if (!types.includes(mimetype)) throw new Error("File must be jpeg or png!")
    return file
}


/////////// CHECK PASSWORD
const password = new GraphQLScalarType({
    name: 'Password',
    description: 'This type checks must be password(must be character, be string, be number)',
    serialize: passwordTest,
    parseValue: passwordTest,
    parseLiteral: function (AST) {
        if (!AST.kind == Kind.STRING) throw new Error("Password must bu string!")

        if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])([a-zA-Z\d@$!%*#?&]){8,15}$/).test(AST.value)) {
            throw new Error("Invalid password! Password must be [@$!%*#?&][a-zA-Z][0-9]")
        }

        return AST.value
    }
})

function passwordTest(value) {
    if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])([a-zA-Z\d@$!%*#?&]){8,15}$/).test(value)) {
        throw new Error("Invalid password! Password must be [@$!%*#?&][a-zA-Z][0-9]")
    }

    return value
}


/////////// CHECK KONTACT
const contactScalar = new GraphQLScalarType({
    name: 'Contact',
    description: 'This is a string for representing contacts',
    serialize: checkContact,
    parseValue: checkContact,
    parseLiteral: function (AST) {
        if (AST.kind == Kind.STRING) {
            return checkContact(AST.value)
        } else throw new Error("Contact value must be String!")
    }
})

function checkContact(value) {
    if (!(typeof value == 'string')) throw new Error("Contact value must be String!")
    if (!(/^998[389][012345789][0-9]{7}$/).test(value)) throw new Error("Contact value must be valid contact!")
    return value
}



/////////// CHECK EMAIL
const emailScalar = new GraphQLScalarType({
    name: 'Email',
    description: 'This is a string for representing email',
    serialize: checkEmail,
    parseValue: checkEmail,
    parseLiteral: function (AST) {
        if (AST.kind == Kind.STRING) {
            return checkEmail(AST.value)
        } else throw new Error("Email value must be String!")
    }
})

function checkEmail(value) {
    if (!(typeof value == 'string')) throw new Error("Email value must be String!")
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/).test(value)) {
        throw new Error("Email value must be valid contact!")
    }
    return value
}

export default {
    Contact: contactScalar,
    Upload: uploadscalar,
    Password: password,
    Email: emailScalar
}