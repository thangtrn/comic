import 'package:auto_route/auto_route.dart';
import 'package:comic_mobile/routes/app_router.gr.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

@RoutePage()
class BottomTabScreen extends StatelessWidget {
  const BottomTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AutoTabsRouter(
      routes: const [
        HomeRoute(),
        GenresRoute(),
        LibraryRoute(),
        MoreRoute(),
      ],
      transitionBuilder: (context, child, animation) => FadeTransition(
        opacity: animation,
        child: child,
      ),
      builder: (context, child) {
        final tabsRouter = AutoTabsRouter.of(context);
        return Scaffold(
          body: child,
          bottomNavigationBar: Container(
            // height: 60,
            decoration: const BoxDecoration(boxShadow: [
              BoxShadow(
                color: Colors.white12,
                offset: Offset(0, 4),
                blurRadius: 6,
              ),
            ]),
            child: BottomNavigationBar(
              elevation: 0,
              currentIndex: tabsRouter.activeIndex,
              onTap: tabsRouter.setActiveIndex,
              type: BottomNavigationBarType.fixed,
              items: const [
                BottomNavigationBarItem(
                  label: 'Home',
                  icon: Icon(CupertinoIcons.hexagon),
                ),
                BottomNavigationBarItem(
                  label: 'Genres',
                  icon: Icon(CupertinoIcons.book),
                ),
                BottomNavigationBarItem(
                  label: 'Library',
                  icon: Icon(CupertinoIcons.bookmark),
                ),
                BottomNavigationBarItem(
                  label: 'More',
                  icon: Icon(Icons.more_horiz_outlined),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
