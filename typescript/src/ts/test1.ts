type Str = 'a' & string;const str: Str = 'a';

type Obj = { name: string } | { age: number };
type Name = { name: string; sex: number; age: number };
type Age = { age: number; sex: number };
type Person = { age: number; sex: number; name: string };

type p1 = Name extends Person ? 1 : 0;

const obj: Name | Age = { name: 'ok', age: 21, sex: 1 };
const obj1: Obj = { name: 'ok' };
const obj2: Obj = { age: 21 };
const person1: Person = { name: 'ok', age: 21, sex: 1 };

const addPerson = (person: Age) => {
 return person;
};

addPerson(person1);

type Obj1 = { name: string; sex: number } & { age: number; sex: number };

const obj3: Obj1 = { name: 'ok', age: 21, sex: 1 };
