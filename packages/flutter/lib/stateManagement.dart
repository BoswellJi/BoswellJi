import 'package:flutter/material.dart';
import 'package:flutter_application_1_temp/shareState.dart';
import 'package:flutter_application_1_temp/stateful.dart';
import 'package:get/get.dart';
import 'package:flutter_application_1_temp/shareState1.dart';

class StateManagementExampleApp extends StatelessWidget {
  const StateManagementExampleApp({super.key});
  

  @override
  Widget build(context) {
    // Instantiate your class using Get.put() to make it available for all "child" routes there.
    final Sharestate c = Get.put(Sharestate());
    final Sharestate1 s1 = Get.put(Sharestate1());

    return Scaffold(
      // Use Obx(()=> to update Text() whenever count is changed.
      appBar: AppBar(title: const Text("状态管理")),

      // Replace the 8 lines Navigator.push by a simple Get.to(). You don't need context
      body: Column(children: [
        const Text(
          "全局状态管理例子:",
          style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Other(),
        const SizedBox(height: 20),
        Other1(),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            c.increment();
            s1.increment();
          },
          child: const Icon(Icons.add, size: 30),
        ),
        const SizedBox(height: 20),
        const Stateful()
      ]),
    );
  }
}

class Other extends StatelessWidget {
  // You can ask Get to find a Controller that is being used by another page and redirect you to it.
  final Sharestate c = Get.find<Sharestate>();

  @override
  Widget build(context) {
    // Access the updated count variable
    return Column(children: [
      Obx(() => Text("子组件 Sharestate: ${c.count}")),
    ]);
  }
}

class Other1 extends StatelessWidget {
  // You can ask Get to find a Controller that is being used by another page and redirect you to it.
  final Sharestate1 s1 = Get.find<Sharestate1>();

  @override
  Widget build(context) {
    // Access the updated count variable
    return Column(
      children: [
        Obx(() => Text("子组件 Sharestate1: ${s1.count}")),
      ],
    );
  }
}
