import 'package:comic_mobile/constants/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

final List<String> imgList = [
  'assets/images/banner-1.png',
  'assets/images/banner-2.jpg',
  'assets/images/banner-2.jpg',
  'assets/images/banner-2.jpg',
];

class HomeCarousel extends StatefulWidget {
  const HomeCarousel({super.key});

  @override
  State<HomeCarousel> createState() => _HomeCarouselState();
}

class _HomeCarouselState extends State<HomeCarousel> {
  final CarouselSliderController _controller = CarouselSliderController();

  int currentIndex = 0;

  void _onItemTab() {}

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: Stack(children: [
        CarouselSlider(
          carouselController: _controller,
          options: CarouselOptions(
            autoPlay: true,
            aspectRatio: 16 / 9,
            enlargeCenterPage: false,
            viewportFraction: 1.0,
            autoPlayInterval: const Duration(seconds: 3),
            autoPlayAnimationDuration: const Duration(milliseconds: 800),
            autoPlayCurve: Curves.fastOutSlowIn,
            onPageChanged: (index, reason) {
              setState(() {
                currentIndex = index;
              });
            },
          ),
          items: imgList.map((image) {
            return Builder(
              builder: (BuildContext context) {
                final double width = MediaQuery.of(context).size.width;
                return Container(
                  width: width,
                  margin: const EdgeInsets.symmetric(horizontal: 14),
                  child: Material(
                    borderRadius: BorderRadius.circular(12),
                    clipBehavior: Clip.antiAlias,
                    child: Ink.image(
                      image: AssetImage(image),
                      fit: BoxFit.cover,
                      child: InkWell(
                        splashFactory: InkSparkle.splashFactory,
                        onTap: _onItemTab,
                      ),
                    ),
                  ),
                );
              },
            );
          }).toList(),
        ),
        Positioned(
          bottom: 10,
          left: 0,
          right: 0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: imgList.asMap().entries.map((entry) {
              int index = entry.key;
              return GestureDetector(
                onTap: () {
                  _controller.animateToPage(index);
                },
                child: AnimatedContainer(
                  height: 8,
                  width: currentIndex == index ? 16 : 8,
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.ease,
                  decoration: BoxDecoration(
                    color: currentIndex == index
                        ? AppColors.primary
                        : AppColors.subtext,
                    borderRadius: BorderRadius.circular(30),
                  ),
                ),
              );
            }).toList(),
          ),
        )
      ]),
    );
  }
}
