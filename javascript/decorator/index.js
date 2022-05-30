class C {
  @logged
  m(arg) {
    this.x = arg;
  }

  @logged
  set x(value) { }
}

new C().m(1);

function logged(f) {
  const name = f.name;
  function wrapped(...args) {
    console.log(`starting ${name} with arguments ${args.join(", ")}`);
    const ret = f.call(this, ...args);
    console.log(`ending ${name}`);
    return ret;
  }
  Object.defineProperty(wrapped, 'name', { value: name, configurable: true })
  return wrapped;
}