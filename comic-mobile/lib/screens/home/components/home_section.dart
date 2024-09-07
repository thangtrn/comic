import 'package:comic_mobile/components/section.dart';
import 'package:comic_mobile/components/card/vertical_card.dart';
import 'package:flutter/material.dart';

class HomeSection extends StatelessWidget {
  const HomeSection({super.key, required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return Section(
      title: title,
      children: [
        GridView.builder(
          itemCount: 9,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount:
                MediaQuery.of(context).orientation == Orientation.portrait
                    ? 3
                    : 5,
            childAspectRatio: 0.55,
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
          ),
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemBuilder: (BuildContext context, int index) {
            return const VerticalCard();
          },
        ),
      ],
    );
  }
}
