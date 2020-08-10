exports.test1 = function () {
  return "test1";
};

exports.fetchUserInfo = function () {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove({
        name: "jmz",
      });
    }, 1000);
  });
};

exports.forEach = function (arr, callback) {
  for (let i = 0, len = arr.length; i < len; i++) {
    callback(arr[i]);
  }
};

exports.timeGame = function (callback) {
  setTimeout(() => {
    callback && callback();
  }, 1000);
};
