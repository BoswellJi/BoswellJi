const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema, GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');

const fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (_,{ id }) => {
        console.log(_);
        return fakeDatabase[id];
      }
    }
  }
});

const schema1 = new GraphQLSchema({ query: queryType });

const schema = buildSchema(`
type User{
  id: String
  name: String
}
type Query{
  day: String
  random: Float!
  roll: [Int]
  rollDice(numDice: Int!,numSides: Int): [Int]
  getDie(numSides: Int):RandomDie,
  ip: String,
  user(id: String): User
}
type RandomDie{
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int!): [Int]
}
type Message{
  id:Float!
  content:String
  author:String
}
input MessageInput{
  content: String
  author: String
}
type Mutation{
  createMessage(input: MessageInput):Message
  updateMessage(id:Float,input:MessageInput):Message
}`);

const loggingMiddleware = (req, res, next) => {
  console.log(req.ip);
  next();
}

class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

const resolvers  = {
  user: ({ id }) => {
    return fakeDatabase[id];
  },
  ip: (args, request) => {
    return request.ip;
  },
  day: () => {
    return Math.random() < 0.5 ? '小于0.5' : '大于0.5'
  },
  random: () => {
    return Math.random();
  },
  roll: () => {
    return [1, 3, 4].map(el => {
      return el + Math.floor(Math.random() * 6);
    })
  },
  rollDice: (args) => {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  },
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6);
  },
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error();
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({ input }) => {
    const id = Math.random() * Math.random();
    fakeDatabase[id] = input;
    console.log(new Message(id, input));

    return new Message(id, input);
  },
  updateMessage: ({ id, input }) => {
    if (fakeDatabase[id]) {
      fakeDatabase[id] = input;
    } else {
      throw new Error()
    }
    return new Message(id, input);
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema1,
  // rootValue: root,
  graphiql: true
}));
app.listen(4000);
