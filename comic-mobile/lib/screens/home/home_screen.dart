import 'package:auto_route/auto_route.dart';
import 'package:comic_mobile/screens/home/components/home_carousel.dart';
import 'package:comic_mobile/screens/home/components/home_header.dart';
import 'package:comic_mobile/screens/home/components/home_section.dart';
import 'package:flutter/material.dart';

@RoutePage()
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        // Make the content scrollable
        child: SafeArea(
          child: Column(
            children: [
              // Header
              HomeHeader(),

              // Carousel
              HomeCarousel(),

              // History
              HomeSection(title: 'Có thể bạn bỏ lỡ')

              // Section
            ],
          ),
        ),
      ),
    );
  }
}
