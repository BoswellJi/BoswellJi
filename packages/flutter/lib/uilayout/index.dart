import 'package:flutter/material.dart';

class UILayOut extends StatelessWidget {
  const UILayOut({super.key, this.todo});

  final String? todo;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('UI 布局')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/flowlayout');
              },
              child: const Text('流式布局'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/postitionlayout');
              },
              child: const Text('层叠布局'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/flexlayout');
              },
              child: const Text('弹性布局'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/gridlayout');
              },
              child: const Text('网格布局'),
            ),
          ],
        ),
      ),
    );
  }
}
