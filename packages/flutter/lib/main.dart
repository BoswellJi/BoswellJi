import 'package:flutter/material.dart';
import 'package:flutter_application_1_temp/animatedContainer.dart';
import 'package:flutter_application_1_temp/animatedList.dart';
import 'package:flutter_application_1_temp/pageview.dart';
import 'package:flutter_application_1_temp/scaleTransition.dart';
import 'third.dart';
import 'second.dart';
import 'first.dart';

void main() {
  runApp(
    MaterialApp(
      title: 'Flutter Demo',
      initialRoute: '/',
      routes: {
        '/': (context) => const FirstScreen(),
        '/second': (context) => const SecondScreen(),
        '/third': (context) => const ThirdScreen(),
        '/pageView': (context) => const PageViewExampleApp(),
        '/animatedList': (context) => const AnimatedListSample(),
        '/animatedContainer': (context) => const AnimatedContainerExampleApp(),
        '/scaleTransition': (context) => const ScaleTransitionExampleApp(),
      },
    ),
  );
}


