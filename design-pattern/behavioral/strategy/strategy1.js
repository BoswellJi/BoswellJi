const validator = {
  // 错误信息
  message: [],
  // 验证字段
  config: {
    firstName: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
  },
  // 开始验证
  validate(data) {
    this.message = [];
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        let result = this.types[this.config[i]].validate(data[i]);
        if (!result) {
          this.message.push(this.types[this.config[i]].instructions);
        }
      }
    }
    return this.hasError();
  },
  // 是否有错误
  hasError() {
    return this.message.length !== 0;
  },
  // 验证类型
  // 先定义好策略，根据使用的策略进行验证
  types: {
    isNonEmpty: {
      validate(value) {
        return value !== '';
      },
      instructions: 'error1'
    },
    isNumber: {
      validate(value) {
        return typeof value === 'number';
      },
      instructions: 'error2'
    },
    isAlphaNum: {
      validate(value) {
        return (/[^a-z0-9]/.test(value));
      },
      instructions: 'error3'
    }
  }
};

validator.validate({
  firstName: 'isNonEmpty',
  age: 2,
  username: ''
});

console.log(validator.message);