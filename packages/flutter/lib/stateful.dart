import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Stateful extends StatefulWidget {
  const Stateful({super.key});

  @override
  State<Stateful> createState() => _StatefulState();
}

class _StatefulState extends State<Stateful> {
  int _counter = 0;

  RxInt num = 0.obs;
  RxList list = [].obs;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text(
          '组件状态管理例子：',
          style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Text('setState Counter: $_counter'),
        const SizedBox(height: 20),
        Obx(() => Text('GetX Counter: ${num.value}')),
        const SizedBox(height: 20),
        Obx(() => Text('GetX List: $list')),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            _incrementCounter();
            num++;
            list.add(num.value);
          },
          child: const Icon(Icons.add, size: 30),
        ),
      ],
    );
  }
}
