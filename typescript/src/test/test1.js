class Greeter {
  constructor(str) { }

  log(obj) { }

  alert(obj) { }
}

const g = new Greeter("Hello");

g.log({ verbose: true });
g.alert({ modal: false, title: "Current Greeting" });