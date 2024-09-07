import 'package:comic_mobile/components/card/horizontal_card.dart';
import 'package:comic_mobile/components/section.dart';
import 'package:comic_mobile/constants/app_colors.dart';
import 'package:flutter/material.dart';

class HomeRanking extends StatefulWidget {
  const HomeRanking({super.key, required this.title});
  final String title;

  @override
  State<HomeRanking> createState() => _HomeRankingState();
}

class _HomeRankingState extends State<HomeRanking>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  final List<String> _tabLabels = [
    "Top tháng",
    "Top tuần",
    "Top ngày",
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabLabels.length, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double rankingItemHeight = 100;

    return Section(
      title: widget.title,
      padding: EdgeInsets.zero,
      children: [
        Theme(
          data: Theme.of(context).copyWith(
            splashColor: Colors.transparent,
            highlightColor: Colors.transparent,
            hoverColor: Colors.transparent,
          ),
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            scrollDirection: Axis.horizontal,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              height: 32,
              child: TabBar(
                controller: _tabController,
                tabs: _tabLabels.map((item) => Tab(text: item)).toList(),
                isScrollable: true,
                indicator: BoxDecoration(
                  color: AppColors.primary,
                  borderRadius: BorderRadius.circular(30),
                ),
                labelStyle: const TextStyle(fontSize: 14),
                labelPadding: const EdgeInsets.symmetric(horizontal: 14),
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Container(
          constraints: BoxConstraints.expand(
            height: rankingItemHeight * 5,
          ), // * TabBarView needs a fixed height to display
          child: TabBarView(
            controller: _tabController,
            children: _tabLabels
                .map((label) => Column(
                      children: List.generate(
                              5,
                              (int index) =>
                                  HorizontalCard(height: rankingItemHeight))
                          .toList(),
                    ))
                .toList(),
          ),
        )
      ],
    );
  }
}
