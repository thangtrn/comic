import 'package:auto_route/auto_route.dart';
import 'package:comic_mobile/screens/home/components/home_carousel.dart';
import 'package:comic_mobile/screens/home/components/home_header.dart';
import 'package:comic_mobile/screens/home/components/home_ranking.dart';
import 'package:comic_mobile/screens/home/components/home_section.dart';
import 'package:flutter/material.dart';

@RoutePage()
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Future<void> _refreshData() async {
    await Future.delayed(const Duration(seconds: 2));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _refreshData,
          child: ListView(
            children: const [
              // Header
              HomeHeader(),

              // Carousel
              HomeCarousel(),

              // Section
              HomeSection(title: 'Có thể bạn bỏ lỡ'),
              HomeSection(title: 'Đề xuất'),

              // Ranking
              HomeRanking(title: 'BXH'),
            ],
          ),
        ),
      ),
    );
  }
}
