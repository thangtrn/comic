import 'package:auto_route/auto_route.dart';
import 'package:comic_mobile/routes/app_router.gr.dart';

@AutoRouterConfig()
class AppRouter extends RootStackRouter {
  @override
  RouteType get defaultRouteType => const RouteType.material();

  @override
  List<AutoRoute> get routes => [
        AutoRoute(
          path: '/home',
          page: BottomTabRoute.page,
          initial: true,
          children: [
            AutoRoute(
              path: '',
              page: HomeRoute.page,
            ),
            AutoRoute(
              path: 'genres',
              page: GenresRoute.page,
            ),
            AutoRoute(
              path: 'library',
              page: LibraryRoute.page,
            ),
            AutoRoute(
              path: 'more',
              page: MoreRoute.page,
            ),
          ],
        )
      ];
}
