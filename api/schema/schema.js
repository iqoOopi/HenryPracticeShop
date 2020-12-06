const _ = require('lodash');
const data = require('../data');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat } = require('graphql');

const brandType = new GraphQLObjectType({
    name: "Brand",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        stock: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        imgUrl: { type: GraphQLString },
        description: { type: GraphQLString },
        brand: {
            type: brandType,
            resolve(parentValue, args) {
                return _.find(data.brand, ['id', parentValue.brandId])
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: GraphQLList(ProductType),
            resolve() {
                return data.products
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return _.find(data.products, ['id', args.id])
            }
        },
        search: {
            type:  GraphQLList(ProductType),
            args: { searchValue: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.filter(data.products, e => e.name.toLowerCase().includes(args.searchValue));
            }
        }
    }
})


// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
    query: RootQuery
})
module.exports = { schema }
