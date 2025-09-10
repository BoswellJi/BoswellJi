import 'package:flutter/material.dart';

class Flexlayout extends StatelessWidget {
  const Flexlayout({super.key, this.todo});

  final String? todo;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('弹性布局')),
        body: Column(
          children: [
            Row(
              spacing: 10,
              children: <Widget>[
                Expanded(
                  flex: 2,
                  child: Container(
                    color: Colors.amber,
                    child: const Text('flex: 2', textAlign: TextAlign.center),
                  ),
                ),
                Expanded(
                  child: Container(
                    color: Colors.amber,
                    child: const Text('flex: 1', textAlign: TextAlign.center),
                  ),
                ),
                Expanded(
                  child: Container(
                    color: Colors.amber,
                    child: const Text('flex: 1', textAlign: TextAlign.center),
                  ),
                ),
              ],
            ),
            Padding(
                padding: const EdgeInsets.only(top: 20),
                child: Row(
                  spacing: 10,
                  children: <Widget>[
                    Expanded(
                      flex: 3,
                      child: Container(
                        color: Colors.amber,
                        child:
                            const Text('flex: 3', textAlign: TextAlign.center),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        color: Colors.amber,
                        child:
                            const Text('flex: 1', textAlign: TextAlign.center),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        color: Colors.amber,
                        child:
                            const Text('flex: 1', textAlign: TextAlign.center),
                      ),
                    ),
                  ],
                )),
          ],
        ));
  }
}
