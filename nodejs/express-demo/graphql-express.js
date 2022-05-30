const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLEnum } = require('graphql');

const schema1 = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),
  muatation: new GraphQLObjectType({
    name: 'Muation',
    fields: muations
  })
});

const schema = buildSchema(`
  type Query{
    hello: String
  }
`);

const root = { hello: () => 'hello world' };

var app = express();
app.use('/graphql', graphqlHttp(req => ({
  schema: schema,
  rootValue: root
})));
app.listen(4000, () => {
  console.log('4000...');
})

const PatchSizeEnum = new GraphQLEnum({
  
});

const missionType = new GraphQLObjectType({
  name: 'Mission',
  fields: {
    name: { type: GraphQLString },
    missionPatch: {
      type: GraphQLString,
      args: {
        size: {
          type: patchSizeType
        }
      }
    }
  }
});

const launchType = new GraphQLObjectType({
  name: 'Launch',
  fields: {
    id: { type: GraphQLID },
    site: { type: GraphQLString },
    mission:
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields:
  })
});
