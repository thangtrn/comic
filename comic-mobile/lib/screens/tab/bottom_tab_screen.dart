import 'package:auto_route/auto_route.dart';
import 'package:comic_mobile/routes/app_router.gr.dart';
import 'package:flutter/material.dart';

@RoutePage()
class BottomTabScreen extends StatelessWidget {
  const BottomTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AutoTabsRouter.pageView(
      routes: const [
        HomeRoute(),
        GenresRoute(),
        LibraryRoute(),
        MoreRoute(),
      ],
      builder: (context, child, _) {
        final tabsRouter = AutoTabsRouter.of(context);
        return Scaffold(
          body: child,
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: tabsRouter.activeIndex,
            onTap: tabsRouter.setActiveIndex,
            type: BottomNavigationBarType.fixed,
            fixedColor: const Color.fromARGB(255, 250, 78, 65),
            unselectedItemColor: const Color.fromARGB(255, 158, 158, 158),
            items: const [
              BottomNavigationBarItem(
                label: 'Home',
                icon: Icon(Icons.home_filled),
              ),
              BottomNavigationBarItem(
                label: 'Genres',
                icon: Icon(Icons.explore),
              ),
              BottomNavigationBarItem(
                label: 'Library',
                icon: Icon(Icons.library_add_check_rounded),
              ),
              BottomNavigationBarItem(
                label: 'More',
                icon: Icon(Icons.more_horiz_rounded),
              ),
            ],
          ),
        );
      },
    );
  }
}
