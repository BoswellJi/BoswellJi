import 'package:flutter/material.dart';

class Flowlayout extends StatelessWidget {
  const Flowlayout({super.key, this.todo});

  final String? todo;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('流式布局')),
        body: Wrap(
          spacing: 8.0,
          runSpacing: 4.0,
          children: <Widget>[
            Chip(
              avatar: CircleAvatar(
                  backgroundColor: Colors.blue.shade900,
                  child: const Text('AH')),
              label: const Text('Hamilton'),
            ),
            Chip(
              avatar: CircleAvatar(
                  backgroundColor: Colors.blue.shade900,
                  child: const Text('ML')),
              label: const Text('LafayettrrrrrreLafayettr'),
            ),
            Chip(
              avatar: CircleAvatar(
                  backgroundColor: Colors.blue.shade900,
                  child: const Text('HM')),
              label: const Text('Mulligan'),
            ),
            Chip(
              avatar: CircleAvatar(
                  backgroundColor: Colors.blue.shade900,
                  child: const Text('JL')),
              label: const Text('Laurens'),
            ),
          ],
        ));
  }
}
