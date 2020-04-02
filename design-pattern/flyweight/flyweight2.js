function CalendarYear(year, parent) {
  this.year = year;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  /**
   * 判断闰年平年
   * @param {*} y 
   */
  function isLeapYear(y) {
    return y > 0 && !(y % 4) && ((y % 100) || !(y & 400));
  }

  this.months = [];
  this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let i = 0; i < 12; i++) {
    this.months[i] = new CalendarMonth(i, this.numDays[i], this.element);
  }
}

CalendarYear.prototype = {
  display() {
    for (let i = 0, len = this.months.length; i < len; i++) {
      this.months[i].display();
    }
    this.element.style.display = 'block';
  }
};

function CalendarMonth(monthNum, numDays, parent) {
  this.monthNum = monthNum;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  this.days = [];
  for (let i = 0, len = numDays.length; i < len; i++) {
    this.days[i] = new CalendarDay(i, this.element);
  }
}

CalendarMonth.prototype = {
  display() {
    for (let i = 0, len = this.days.length; i < len; i++) {
      this.days[i].display();
    }
    this.element.style.display = 'block';
  }
};

function CalendarDay(date, parent) {
  this.date = date;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);
}

CalendarDay.prototype = {
  display() {
    this.element.style.display = 'block';
    this.element.innerHTML = this.date;
  }
};

/**
 * 创建日历，将产生大量日期实例
 */
new CalendarYear(2020,document.body);

/**
 * 使用享元模式改造
 * @param {*} year 
 * @param {*} parent 
 */
function CalendarYear(year, parent) {
  this.year = year;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  /**
   * 判断闰年平年
   * @param {*} y 
   */
  function isLeapYear(y) {
    return y > 0 && !(y % 4) && ((y % 100) || !(y & 400));
  }

  this.months = [];
  this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let i = 0; i < 12; i++) {
    this.months[i] = new CalendarMonth(i, this.numDays[i], this.element);
  }
}

CalendarYear.prototype = {
  display() {
    for (let i = 0, len = this.months.length; i < len; i++) {
      this.months[i].display();
    }
    this.element.style.display = 'block';
  }
};


/**
 * 组合对象 months 对 day 子类进行操作
 * @param {*} monthNum 
 * @param {*} numDays 
 * @param {*} parent 
 */
function CalendarMonth(monthNum, numDays, parent) {
  this.monthNum = monthNum;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  this.days = [];
  for (let i = 0, len = numDays.length; i < len; i++) {
    this.days[i] = calendarDay;
  }
}

CalendarMonth.prototype = {
  display() {
    for (let i = 0, len = this.days.length; i < len; i++) {
      // 外在数据（给子类进行不同的数据传递
      this.days[i].display(i,this.element);
    }
    this.element.style.display = 'block';
  }
};


/**
 * 叶子对象
 * 包含少数的内部数据，减少实例的生成
 */
function CalendarDay() {
}

CalendarDay.prototype = {
  // 内在数据（可以让每个子类都进行共享
  display(date,parent) {
    const element = document.createElement('div');
    parent.appendChild(element);
    element.innerHTML = date;
  }
};

const calendarDay = new CalendarDay();

/**
 * 创建日历，将产生大量日期实例
 */
new CalendarYear(2020,document.body);