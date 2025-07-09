import 'package:flutter/material.dart';

class ScaleTransitionExampleApp extends StatelessWidget {
  const ScaleTransitionExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('scaleTransition Sample')),
      body: const ScaleTransitionExample(),
    );
  }
}

class ScaleTransitionExample extends StatefulWidget {
  const ScaleTransitionExample({super.key});

  @override
  State<ScaleTransitionExample> createState() => _ScaleTransitionExampleState();
}

/// [AnimationController]s can be created with `vsync: this` because of
/// [TickerProviderStateMixin].
class _ScaleTransitionExampleState extends State<ScaleTransitionExample>
    with TickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    duration: const Duration(seconds: 2),
    vsync: this,
  )..repeat(reverse: true);

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ScaleTransition(
          scale: _controller,
          child: const Padding(
              padding: EdgeInsets.all(8.0), child: FlutterLogo(size: 150.0)),
        ),
      ),
    );
  }
}
