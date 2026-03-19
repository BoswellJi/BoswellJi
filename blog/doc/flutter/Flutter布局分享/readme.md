# Flutter 布局

## 前言

1. JS简单，但是害怕UI开发，毫无逻辑可循。
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
  spacing: 8.0,
  runSpacing: 4.0,
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

元素会在一个特定的区域内进行重叠排列，后面的元素会覆盖前面的元素，类似于图层的概念。通过堆叠 Widget 实现 “元素覆盖” 效果的布局方式

### 适用场景

- 徽章效果
- 全屏覆盖
- 对话框弹框

### Flutter 实现

- Stack

定义： Stack 是层叠布局的 “容器”，负责管理所有子 Widget 的堆叠规则，自身不具备定位能力。

- Positioned

定义： Positioned 必须作为 Stack 的直接子 Widget，用于精确控制子 Widget 在 Stack 中的位置，通过距离 Stack 边缘的偏移量定位。

用法：

```dart
const Stack({
  Key? key,
  AlignmentGeometry alignment = AlignmentDirectional.topStart,
  TextDirection? textDirection,
  StackFit fit = StackFit.loose,
  Clip clipBehavior = Clip.hardEdge,
  List<Widget> children = const <Widget>[],
})
```

```dart
const Positioned({
  Key? key,
  double? left,
  double? top,
  double? right,
  double? bottom,
  double? width,
  double? height,
  required Widget child,
})
```

效果：

## 弹性布局

让子 Widget 能根据父容器的剩余空间灵活收缩或扩展，从而适配不同尺寸的屏幕或容器，实现响应式布局

### 适用场景

- 水平垂直填充整个父级空间的布局

### Flutter 实现

- Row

定义： 弹性布局的容器，以水平方向显示其子项的小部件。

- Column

定义： 弹性布局的容器，以垂直方向显示其子项的小部件。

- Expanded

定义： Expanded 必须作为 Row、Column 的直接子 Widget，用于占据父容器的剩余空间。

用法：

```dart
const Row({
  Key? key,
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
  MainAxisSize mainAxisSize = MainAxisSize.max,
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
  TextDirection? textDirection,
  VerticalDirection verticalDirection = VerticalDirection.down,
  TextBaseline? textBaseline,
  double spacing = 0.0,
  List<Widget> children = const <Widget>[],
})

```

```dart
const Column({
  Key? key,
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
  MainAxisSize mainAxisSize = MainAxisSize.max,
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
  TextDirection? textDirection,
  VerticalDirection verticalDirection = VerticalDirection.down,
  TextBaseline? textBaseline,
  double spacing = 0.0,
  List<Widget> children = const <Widget>[],
})
```

```dart
const Expanded({
  Key? key,
  int flex = 1,
  required Widget child,
})
```

效果：

## 网格布局

用于实现多行多列的二维网格结构，适合像图片墙、商品列表、图标矩阵等场景。它能自动管理子 Widget 的排列、换行和尺寸，支持灵活配置列数、间距和滚动行为。

### 适用场景

- 二维布局

### Flutter 实现

- GridView

定义： GridView 是一个可滚动的网格列表，支持横向和纵向的滚动，适合展示大量相同类型的子 Widget。

用法：

```dart
GridView.count(
  crossAxisCount: 2,
  childAspectRatio: 1,
  padding: const EdgeInsets.all(8),
  children: List.generate(100, (index) {
    return Card(
      child: Center(
        child: Text('Item $index'),
      ),
    );
  }),
)
```

效果：

## 总结

没有银弹，选择合适的。
