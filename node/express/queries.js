const { GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');

module.exports = {
  type: '',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, ctx, options) {
    return;
  }
}