# Flutter 布局

## 前言

1. 前端简单，但是害怕UI开发，毫无逻辑可循。
2. 前端天然的就是后端的可视化调试工具。
3. 误会了，你们只是再改模板而已。
4. UI是门艺术。
5. 小小全栈。

## Flutter 布局是什么

UI 元素如何在屏幕上排列和显示的规则。

## Flutter 布局有哪些

- 流式布局
- 层叠布局
- 弹性布局
- 网格布局

## 流式布局

元素会沿着一个水平方向依次排列，当前行方向的空间不足以容纳下一个元素时，自动换行到下一行，继续排列，类似文本在文档中 “流式排列、自动换行” 的行为。

### 适用场景

- 多标签/按钮排列：如页面顶部的分类标签（“推荐”“热点”“科技”）、表单底部的操作按钮（“取消”“下一步”“提交”），需适配不同屏幕宽度。
- 商品/卡片列表：如电商 App 的商品列表、资讯 App 的文章卡片，在手机（单排 1-2 个）、平板（单排 3-4 个）上自动调整行数和列数。

### Flutter 实现

- Wrap

定义： 在水平或垂直方向上显示其子项的小部件。

用法：

```dart
const Wrap({
  Key? key,
  Axis direction = Axis.horizontal,
  WrapAlignment alignment = WrapAlignment.start,
  double spacing = 0.0,
  WrapAlignment runAlignment = WrapAlignment.start,
  double runSpacing = 0.0,
  WrapCrossAlignment crossAxisAlignment = WrapCrossAlignment.start,
  TextDirection? textDirection,
  VerticalDirection verticalDirection = VerticalDirection.down,
  Clip clipBehavior = Clip.none,
  List<Widget> children = const <Widget>[],
})
```

```dart
Wrap(
  spacing: 8.0, // gap between adjacent chips
  runSpacing: 4.0, // gap between lines
  children: <Widget>[
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('AH')),
      label: const Text('Hamilton'),
    ),
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('ML')),
      label: const Text('Lafayette'),
    ),
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('HM')),
      label: const Text('Mulligan'),
    ),
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('JL')),
      label: const Text('Laurens'),
    ),
  ],
)
```

效果：

## 层叠布局

元素会在一个特定的区域内进行重叠排列，后面的元素会覆盖前面的元素，类似于图层的概念。

### 适用场景

- 多标签/按钮排列：如页面顶部的分类标签（“推荐”“热点”“科技”）、表单底部的操作按钮（“取消”“下一步”“提交”），需适配不同屏幕宽度。
- 商品/卡片列表：如电商 App 的商品列表、资讯 App 的文章卡片，在手机（单排 1-2 个）、平板（单排 3-4 个）上自动调整行数和列数。

### Flutter 实现

- Wrap

定义： 在水平或垂直方向上显示其子项的小部件。

用法：

```dart
const Wrap({
  Key? key,
  Axis direction = Axis.horizontal,
  WrapAlignment alignment = WrapAlignment.start,
  double spacing = 0.0,
  WrapAlignment runAlignment = WrapAlignment.start,
  double runSpacing = 0.0,
  WrapCrossAlignment crossAxisAlignment = WrapCrossAlignment.start,
  TextDirection? textDirection,
  VerticalDirection verticalDirection = VerticalDirection.down,
  Clip clipBehavior = Clip.none,
  List<Widget> children = const <Widget>[],
})
```

```dart
Wrap(
  spacing: 8.0, // gap between adjacent chips
  runSpacing: 4.0, // gap between lines
  children: <Widget>[
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('AH')),
      label: const Text('Hamilton'),
    ),
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('ML')),
      label: const Text('Lafayette'),
    ),
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('HM')),
      label: const Text('Mulligan'),
    ),
    Chip(
      avatar: CircleAvatar(backgroundColor: Colors.blue.shade900, child: const Text('JL')),
      label: const Text('Laurens'),
    ),
  ],
)
```

效果：
