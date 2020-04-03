const { graphql, buildSchema, GraphQLList, GraphQLFloat } = require('graphql');

/**
 * Int
 * Float
 * String
 * [Int] 数组
 * String! 非空字符串
 * [Int!]! 非空整形数组
 */

const Query = {
  hello: String,
  age: Int,
  info: [Int],
  length(unit: GrapQLFloat): Int
};


// 定义的是接口中的数据架构
const schema = buildSchema(`
  type Query{
    hello: String,  
    age: Int,
    info: [Int],
    length(unit: Float): Int
  }
`);

// 定义查询语句
const query = `{hello,age,info,length(unit: 2323)}`;

// 提供数据进行返回
const root = {
  hello: () => 'hello world',
  age: () => 12,
  info: () => [],
  length: (params) => {
    console.log(params);
    return params.unit;
  }
};

// 执行查询
graphql(schema, query, root).then((res) => {
  console.log(res);
});