export const person: {
  name: string,
  age: number
};

export const Boswell : {
  person: person,
  sayType: (person: string) => void
};

export function get(url: any, params?: any, callback?: any): any;