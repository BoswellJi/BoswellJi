const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString ,GraphQLInt} = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
      age:{
        type: GraphQLInt,
        resolve(){
          return 22;
        },
      },
      sex: {
        type: GraphQLInt,
        resolve(){
          return
        }
      }
    },
  }),
});

let query = `{hello}`;
query = `{age,sex}`;

graphql(schema, query).then(res => {
  console.log(res);
});