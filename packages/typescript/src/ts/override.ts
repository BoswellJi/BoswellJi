import {person} from '../js/person';

class Base {
  say() { }
}

class ChildA extends Base {
  override say() { }
}

person.age = 12;