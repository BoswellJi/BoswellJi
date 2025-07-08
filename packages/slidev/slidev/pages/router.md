
# Flutter中的路由

- Flutter为在屏幕之间导航和处理深度链接提供了一个完整的系统。
- 在 Flutter 中，屏 (screen) 和 页面 (page) 都叫做 路由 (route)，在下文中统称为“路由 (route)”。
- 在Flutter中通过Navigator组件管理路由导航。
- 并提供了管理堆栈的方法。
    -  Navigator.push
    -  Navigator.pop

- Flutter中给我们提供了两种配置路由跳转的方式：
    -  基本路由 
    -  命名路由


# 基本路由

## 常规方式跳转


## 路由跳转

```dart {height:'120px'}
class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Route')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Open route'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const SecondRoute()),
            );
          },
        ),
      ),
    );
  }
}

```


## 重要Wedgit


* Navigator： 一个小部件，它管理一组具有堆栈规则的子小部件。
* MaterialPageRoute: 一个模式路由，用一个平台自适应的过渡取代整个屏幕
* SecondRoute: 指定跳转的页面类



## 路由返回

```dart {height:'120px'}
class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Route')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```


## 重要Wedgit

<div class="flex justify-center ml-[20px] mt-[100px]">

* Navigator： 一个小部件，它管理一组具有堆栈规则的子小部件。

</div>



## 路由跳转传值

```dart {height:'100px'}
 // 方式一：
 Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => DetailScreen(todo: todos[index]),
          ),
        );

 // 方式二：
 Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const DetailScreen(),
            // Pass the arguments as part of the RouteSettings. The
            // DetailScreen reads the arguments from these settings.
            settings: RouteSettings(arguments: todos[index]),
          ),
        );
```

## 重要Widget

<div class="flex justify-center ml-[20px] mt-[100px]">

* DetailScreen：通过给跳转页面的类的构造函数传值的方式来传递参数
* RouteSettings：在构造 Route 时可能有用的数据。

</div>


## 路由返回传值

```dart {height:'100px'}
 // 传递方
 onPressed: () {
    // Close the screen and return "Yep!" as the result.
    Navigator.pop(context, 'Yep!');
  },

  // 接收方
  final result = await Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const SelectionScreen()),
  );
```

# 命名路由

## 顾名思义，有名字的路由


## 路由定义

```dart
void main() {
  runApp(
    MaterialApp(
      title: 'Named Routes Demo',
      initialRoute: '/',
      routes: {
        '/': (context) => const FirstScreen(),
        '/second': (context) => const SecondScreen(),
      },
    ),
  );
}
```


## 路由跳转

```dart
body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pushNamed(context, '/second');
          },
          child: const Text('Launch screen'),
        ),
      ),
```


## 命名路由传参

```dart
// 传递单个参数
Navigator.pushNamed(context, '/user', arguments: 123);

// 传递多个参数（使用 Map）
Navigator.pushNamed(
  context, 
  '/product', 
  arguments: {
    'id': 456,
    'name': 'iPhone',
    'price': 999.99,
  }
);
```

# 路由替换 

- 即将跳转的路由来替换当前的路由

- pushReplacementNamed

```dart
Navigator.of(context).pushReplacementNamed('/registerSecond');
```


# 返回到根路由 

- 从多层的嵌套路由返回到根路由
- pushAndRemoveUntil

```dart
Navigator.of(context).pushAndRemoveUntil(
  MaterialPageRoute(builder: (BuildContext context) {
  return const Tabs();
}), (route) => false);
```


