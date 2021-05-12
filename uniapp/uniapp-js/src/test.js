var inversify = require("inversify");
require("reflect-metadata");

var TYPES = {
  Ninja: "Ninja",
  Katana: "Katana",
  Shuriken: "Shuriken"
};

class Katana {
  hit() {
      return "cut!";
  }
}

class Shuriken {
  throw() {
      return "hit!";
  }
}

class Ninja {
  constructor(katana, shuriken) {
      this._katana = katana;
      this._shuriken = shuriken;
  }
  fight() { return this._katana.hit(); };
  sneak() { return this._shuriken.throw(); };
}

// Declare as injectable and its dependencies
inversify.decorate(inversify.injectable(), Katana);
inversify.decorate(inversify.injectable(), Shuriken);
inversify.decorate(inversify.injectable(), Ninja);
inversify.decorate(inversify.inject(TYPES.Katana), Ninja, 0);
inversify.decorate(inversify.inject(TYPES.Shuriken), Ninja, 1);

// Declare bindings
var container = new inversify.Container();
container.bind(TYPES.Ninja).to(Ninja);
container.bind(TYPES.Katana).to(Katana);
container.bind(TYPES.Shuriken).to(Shuriken);

export {
  container,
  TYPES
};