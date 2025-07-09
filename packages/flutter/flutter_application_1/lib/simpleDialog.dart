import 'package:flutter/material.dart';

class SimpleExample extends StatelessWidget {
  const SimpleExample({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        final String? result = await showDialog<String>(
            context: context,
            builder: (BuildContext context) {
              return SimpleDialog(
                title: const Text('Select assignment'),
                children: <Widget>[
                  SimpleDialogOption(
                    onPressed: () {
                      Navigator.pop(context, 'Treasury');
                    },
                    child: const Text('Treasury department'),
                  ),
                  SimpleDialogOption(
                    onPressed: () {
                      Navigator.pop(context, 'State');
                    },
                    child: const Text('State department'),
                  ),
                ],
              );
            });
        if (result != null) {
          print('Selected department: $result');
        }
      },
      child: const Text('弹出SimpleDialog'),
    );
  }
}
