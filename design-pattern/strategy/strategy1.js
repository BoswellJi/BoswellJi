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
  types: {
    isNonEmpty: {
      validate(value) {
        return value !== '';
      },
      instructions: 'error'
    },
    isNumber: {
      validate(value) {
        return typeof value === 'number';
      },
      instructions: 'error'
    },
    isAlphaNum: {
      validate(value) {
        return (/[^a-z0-9]/.test(value));
      },
      instructions: 'error'
    }
  }
};

validator.validate({
  firstName: 'isNonEmpty',
  age: 2,
  username: '#'
});

console.log(validator.message);