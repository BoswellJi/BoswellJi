import 'package:flutter/material.dart';
import 'package:flutter_application_1_temp/shareState.dart';
import 'package:get/get.dart';


class StateManagementExampleApp extends StatelessWidget {
  const StateManagementExampleApp({super.key});


  @override
  Widget build(context) {

    // Instantiate your class using Get.put() to make it available for all "child" routes there.
    final Controller c = Get.put(Controller());

    return Scaffold(
      // Use Obx(()=> to update Text() whenever count is changed.
      appBar: AppBar(title: Obx(() => Text("Clicks 父组件: ${c.count}"))),

      // Replace the 8 lines Navigator.push by a simple Get.to(). You don't need context
      body: Center(child: Other()),
      floatingActionButton:
          FloatingActionButton(onPressed: c.increment, child: const Icon(Icons.add)));
  }
}

class Other extends StatelessWidget {
  
  // You can ask Get to find a Controller that is being used by another page and redirect you to it.
  final Controller c = Get.find();

  @override
  Widget build(context){
     // Access the updated count variable
     return  Obx(() => Text("子组件 ${c.count}",
        style: const TextStyle(fontSize: 30, fontWeight: FontWeight.bold)));
  }
}