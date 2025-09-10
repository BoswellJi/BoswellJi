import 'package:flutter/material.dart';

class Postitionlayout extends StatelessWidget {
  const Postitionlayout({super.key, this.todo});

  final String? todo;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('层叠布局')),
        body: Stack(
          alignment: Alignment.center,
          children: [
            Container(
              width: 300,
              height: 200,
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            Image.network(
              'https://picsum.photos/200/150',
              width: 200,
              height: 150,
            ),
            const Positioned(
              bottom: 10,
              child: Text(
                '层叠布局示例',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ));
  }
}
