/*
 * Created with Sublime Text 3.
 * demo地址: http://www.lovewebgames.com/jsmodule/index.html
 * github: https://github.com/tianxiangbing/paging
 * User: 田想兵
 * Date: 2015-06-11
 * Time: 16:27:55
 * Contact: 55342775@qq.com
 * Desc: 确保代码最新及时修复bug，请去github上下载最新源码 https://github.com/tianxiangbing/paging
 */
(function (root, factory) {
  //amd
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'query'], factory);
  } else if (typeof exports === 'object') { //commonjs
    module.exports = factory();
  } else {
    root.Paging = factory(window.Zepto || window.jQuery || $, Query);
  }
})(this, function ($, Query) {
  $.fn.Paging = function (settings) {
    var arr = [];
    // $(this) 多个分页节点
    $(this).each(function () {
      // 合并option
      var options = $.extend({
        target: $(this)
      }, settings);
      var lz = new Paging();
      lz.init(options);
      arr.push(lz);
    });
    return arr;
  };

  function Paging() {
    var rnd = Math.random().toString().replace('.', '');
    this.id = 'Paging_' + rnd;
  }
  Paging.prototype = {
    init: function (settings) {
      // 合并option
      this.settings = $.extend({
        callback: null,
        pagesize: 10,
        current: 1,
        prevTpl: "上一页",
        nextTpl: "下一页",
        firstTpl: "首页",
        lastTpl: "末页",
        ellipseTpl: "...",
        toolbar: false,
        hash: false,
        pageSizeList: [5, 10, 15, 20]
      }, settings);
      // 分页元素
      this.target = $(this.settings.target);
      // 添加包裹层
      this.container = $('<div id="' + this.id + '" class="ui-paging-container"/>');
      // 插入
      this.target.append(this.container);
      // 渲染页码
      this.render(this.settings);
      this.format();
      // 绑定事件
      this.bindEvent();
    },
    render: function (ops) {
      // 是否存在总数， 
      typeof ops.count !== 'undefined' ? this.count = ops.count : this.count = this.settings.count;
      // 是否存在每页尺寸
      typeof ops.pagesize !== 'undefined' ? this.pagesize = ops.pagesize : this.pagesize = this.settings.pagesize;
      // 是否存在当前页
      typeof ops.current !== 'undefined' ? this.current = ops.current : this.current = this.settings.current;
      // 计算页数
      this.pagecount = Math.ceil(this.count / this.pagesize);
      this.format();
    },
    bindEvent: function () {
      var _this = this;
      this.container.on('click', 'li.js-page-action,li.ui-pager', function (e) {
        if ($(this).hasClass('ui-pager-disabled') || $(this).hasClass('focus')) {
          return false;
        }
        if ($(this).hasClass('js-page-action')) {
          if ($(this).hasClass('js-page-first')) {
            _this.current = 1;
          }
          if ($(this).hasClass('js-page-prev')) {
            _this.current = Math.max(1, _this.current - 1);
          }
          if ($(this).hasClass('js-page-next')) {
            _this.current = Math.min(_this.pagecount, _this.current + 1);
          }
          if ($(this).hasClass('js-page-last')) {
            _this.current = _this.pagecount;
          }
        } else if ($(this).data('page')) {
          _this.current = parseInt($(this).data('page'));
        }
        _this.go();
      });
			/*
			$(window).on('hashchange',function(){
				var page=  parseInt(Query.getHash('page'));
				if(_this.current !=page){
					_this.go(page||1);
				}
			})
			 */
    },
    go: function (p) {
      var _this = this;
      // 跳转页码
      this.current = p || this.current;
      // 保证当前页码合法
      // 取1，pagecount
      this.current = Math.max(1, _this.current);
      this.current = Math.min(this.current, _this.pagecount);
      // 改变分页组件状态（根据当前页码
      this.format();
      if (this.settings.hash) {
        // 设置页面hash
        Query.setHash({
          page: this.current
        });
      }
      // 是否有跳转回调
      this.settings.callback && this.settings.callback(this.current, this.pagesize, this.pagecount);
    },
    changePagesize: function (ps) {
      this.render({
        pagesize: ps
      });
      // 是否传递改变每页尺寸后的回调方法
      this.settings.changePagesize && this.settings.changePagesize.call(this, this.pagesize, this.current, this.pagecount);
    },
    format: function () {
      var html = '<ul>'
      // 首页和上一页
      html += '<li class="js-page-first js-page-action ui-pager" >' + this.settings.firstTpl + '</li>';
      html += '<li class="js-page-prev js-page-action ui-pager">' + this.settings.prevTpl + '</li>';
      // 总页数大于6
      if (this.pagecount > 6) {
        // 第一页
        html += '<li data-page="1" class="ui-pager">1</li>';
        // 当前页码数小于等于2
        if (this.current <= 2) {

          html += '<li data-page="2" class="ui-pager">2</li>';
          html += '<li data-page="3" class="ui-pager">3</li>';
          // 省略页码
          html += '<li class="ui-paging-ellipse">' + this.settings.ellipseTpl + '</li>';
        } else
          // 当前页码大与2 小于 倒数第三页 并且总页数大于（一屏显示页数 展示省略符号
          //
          // 当前页码大于2，并且小于等于总倒数第三页
          if (this.current > 2 && this.current <= this.pagecount - 2) {
            // 当前页码大于3
            if (this.current > 3) {
              // 前面展示省略符号
              html += '<li>' + this.settings.ellipseTpl + '</li>';
            }
            html += '<li data-page="' + (this.current - 1) + '" class="ui-pager">' + (this.current - 1) + '</li>';
            html += '<li data-page="' + this.current + '" class="ui-pager">' + this.current + '</li>';
            html += '<li data-page="' + (this.current + 1) + '" class="ui-pager">' + (this.current + 1) + '</li>';
            // 并小于倒数第三页面展示省略符号
            if (this.current < this.pagecount - 2) {
              html += '<li class="ui-paging-ellipse" class="ui-pager">' + this.settings.ellipseTpl + '</li>';
            }
          } else {
            //当前页码为倒数第1，2页
            html += '<li class="ui-paging-ellipse" >' + this.settings.ellipseTpl + '</li>';
            for (var i = this.pagecount - 2; i < this.pagecount; i++) {
              html += '<li data-page="' + i + '" class="ui-pager">' + i + '</li>'
            }
          }
        // 总页数
        html += '<li data-page="' + this.pagecount + '" class="ui-pager">' + this.pagecount + '</li>';
      } else {
        // 总页数小于6
        for (var i = 1; i <= this.pagecount; i++) {
          html += '<li data-page="' + i + '" class="ui-pager">' + i + '</li>'
        }
      }
      // 下一页
      html += '<li class="js-page-next js-page-action ui-pager">' + this.settings.nextTpl + '</li>';
      // 最后一页
      html += '<li class="js-page-last js-page-action ui-pager">' + this.settings.lastTpl + '</li>';
      html += '</ul>';
      this.container.html(html);
      // 当前页码为1 上一页，首页按钮样式置灰色
      if (this.current == 1) {
        $('.js-page-prev', this.container).addClass('ui-pager-disabled');
        $('.js-page-first', this.container).addClass('ui-pager-disabled');
      }
      // 最后一页，下一页，按钮样式置灰色
      if (this.current == this.pagecount) {
        $('.js-page-next', this.container).addClass('ui-pager-disabled');
        $('.js-page-last', this.container).addClass('ui-pager-disabled');
      }
      // 当前页码高亮
      this.container.find('li[data-page="' + this.current + '"]').addClass('focus').siblings().removeClass('focus');
      // 是否设置工具条
      if (this.settings.toolbar) {
        this.bindToolbar();
      }
    },
    bindToolbar: function () {
      var _this = this;
      var html = $('<li class="ui-paging-toolbar"><select class="ui-select-pagesize"></select><input type="text" class="ui-paging-count"/><a href="javascript:void(0)">跳转</a></li>');
      var sel = $('.ui-select-pagesize', html);
      var str = '';
      for (var i = 0, l = this.settings.pageSizeList.length; i < l; i++) {
        str += '<option value="' + this.settings.pageSizeList[i] + '">' + this.settings.pageSizeList[i] + '条/页</option>';
      }
      sel.html(str);
      sel.val(this.pagesize);
      $('input', html).val(this.current);
      $('input', html).click(function () {
        $(this).select();
      }).keydown(function (e) {
        if (e.keyCode == 13) {
          var current = parseInt($(this).val()) || 1;
          _this.go(current);
        }
      });
      $('a', html).click(function () {
        var current = parseInt($(this).prev().val()) || 1;
        _this.go(current);
      });
      sel.change(function () {
        _this.changePagesize($(this).val());
      });
      this.container.children('ul').append(html);
    }
  }
  return Paging;
});