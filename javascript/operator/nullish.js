const person = {
  name: 'jmz',
  age: 0,
  sex: undefined,
  info: null
};

const age = person.age ?? 1; // 0
const sex = person.sex ?? 1; // 1
const info = person.info ?? 1; // 1

console.log(age,sex,info);
