import 'package:flutter/material.dart';
import 'package:flutter_application_1/alertDialog.dart';
import 'package:flutter_application_1/second.dart';
import 'package:flutter_application_1/showModalBottomSheet.dart';
import 'package:flutter_application_1/simpleDialog.dart';

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('首页')),
        body: Column(children: [
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const SecondScreen()),
              );
            },
            child: const Text('普通导航，跳转第二页'),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        const SecondScreen(todo: '这是从第一个页面传递过来的待办事项')),
              );
            },
            child: const Text('普通导航，跳转第二页，携带参数'),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/third');
            },
            child: const Text('命名导航，跳转第三页'),
          ),
          const SizedBox(height: 20),
          const DialogExample(),
          const SizedBox(height: 20),
          const SimpleExample(),
          const SizedBox(height: 20),
          const BottomSheetExample(),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/pageView');
            },
            child: const Text('PageView 演示'),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/animatedList');
            },
            child: const Text('AnimatedList 演示'),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/animatedContainer');
            },
            child: const Text('animatedContainer 隐式动画 演示'),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/scaleTransition');
            },
            child: const Text('scaleTransition 显示动画 演示'),
          ),
        ]));
  }
}
