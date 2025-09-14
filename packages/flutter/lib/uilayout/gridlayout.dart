import 'package:flutter/material.dart';

class Gridlayout extends StatelessWidget {
  Gridlayout({super.key, this.todo});

  final String? todo;

  // 模拟数据：不同长度的文本
  final List<String> items = [
    "短文本",
    "中等长度的文本内容",
    "很长很长的文本，需要占据更多宽度",
    "测试",
    "Flutter 自适应宽度",
    "GridView 子元素宽度自适应示例",
    "短",
    "较长文本",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('网格布局')),
        body: GridView.builder(
          // 禁用滚动（可选，根据需求设置）
          physics: const NeverScrollableScrollPhysics(),
          // 让网格高度自适应内容
          shrinkWrap: true,
          // 自定义网格布局规则
          gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
            // 子元素最大宽度（关键：超过此宽度会换行）
            maxCrossAxisExtent: 200,
            // 列间距
            crossAxisSpacing: 10,
            // 行间距
            mainAxisSpacing: 10,
            // 宽高比（高度 = 宽度 / 1.5）
            childAspectRatio: 1.5,
          ),
          itemCount: items.length,
          itemBuilder: (context, index) {
            return Container(
              // 子元素宽度由内容决定（不设置固定宽度）
              padding: const EdgeInsets.all(10),
              color: Colors.blue[100],
              child: Text(
                items[index],
                style: const TextStyle(fontSize: 16, color: Colors.black),
              ),
            );
          },
        ));

    //   GridView.builder(
    //     gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    //       crossAxisCount: 2,
    //       crossAxisSpacing: 10,
    //       mainAxisSpacing: 10,
    //     ),
    //     itemCount: 6,
    //     itemBuilder: (context, index) {
    //       // 第1个和第4个子元素高度加倍
    //       final height = (index == 0 || index == 3) ? 200.0 : 100.0;
    //       return Container(
    //         height: height,
    //         color: Colors.purple,
    //         child: Center(child: Text('Item $index')),
    //       );
    //     },
    //   ),
    // );

    // GridView.count(
    //   physics: const NeverScrollableScrollPhysics(),
    //   primary: false,
    //   padding: const EdgeInsets.all(20),
    //   crossAxisSpacing: 10,
    //   mainAxisSpacing: 10,
    //   crossAxisCount: 3,
    //   shrinkWrap: true,
    //   children: <Widget>[
    //     Container(
    //       padding: const EdgeInsets.all(8),
    //       width: 50, // 固定宽度
    //       height: 30,
    //       color: Colors.teal[100],
    //       child: Container(
    //         color: Colors.blue[200],
    //         child: const Text('I\'m dedicating every day to you'),
    //       ),
    //     ),
    //     Container(
    //       padding: const EdgeInsets.all(8),
    //       color: Colors.teal[200],
    //       child: const Text('Heed not the rabble'),
    //     ),
    //     Container(
    //       padding: const EdgeInsets.all(8),
    //       color: Colors.teal[300],
    //       child: const Text('Sound of screams but the'),
    //     ),
    //     Container(
    //       padding: const EdgeInsets.all(8),
    //       color: Colors.teal[400],
    //       child: const Text('Who scream'),
    //     ),
    //     Container(
    //       padding: const EdgeInsets.all(8),
    //       color: Colors.teal[500],
    //       child: const Text('Revolution is coming...'),
    //     ),
    //     Container(
    //       padding: const EdgeInsets.all(8),
    //       color: Colors.teal[600],
    //       child: const Text('Revolution, they...'),
    //     ),
    //   ],
    // ),
    // Text(todo ?? 'no da4ta'),
  }
}
