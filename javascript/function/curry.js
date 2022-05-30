function curry() {
  const args = Array.prototype.slice.call(arguments);
  const fn = function () {
    const newArgs = args.concat(Array.prototype.slice.call(arguments));
  }
}