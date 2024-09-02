// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouterGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:auto_route/auto_route.dart' as _i6;
import 'package:comic_mobile/screens/genres/genres_screen.dart' as _i2;
import 'package:comic_mobile/screens/home/home_screen.dart' as _i3;
import 'package:comic_mobile/screens/library/library_screen.dart' as _i4;
import 'package:comic_mobile/screens/more/more_screen.dart' as _i5;
import 'package:comic_mobile/screens/tab/bottom_tab_screen.dart' as _i1;

/// generated route for
/// [_i1.BottomTabScreen]
class BottomTabRoute extends _i6.PageRouteInfo<void> {
  const BottomTabRoute({List<_i6.PageRouteInfo>? children})
      : super(
          BottomTabRoute.name,
          initialChildren: children,
        );

  static const String name = 'BottomTabRoute';

  static _i6.PageInfo page = _i6.PageInfo(
    name,
    builder: (data) {
      return const _i1.BottomTabScreen();
    },
  );
}

/// generated route for
/// [_i2.GenresScreen]
class GenresRoute extends _i6.PageRouteInfo<void> {
  const GenresRoute({List<_i6.PageRouteInfo>? children})
      : super(
          GenresRoute.name,
          initialChildren: children,
        );

  static const String name = 'GenresRoute';

  static _i6.PageInfo page = _i6.PageInfo(
    name,
    builder: (data) {
      return const _i2.GenresScreen();
    },
  );
}

/// generated route for
/// [_i3.HomeScreen]
class HomeRoute extends _i6.PageRouteInfo<void> {
  const HomeRoute({List<_i6.PageRouteInfo>? children})
      : super(
          HomeRoute.name,
          initialChildren: children,
        );

  static const String name = 'HomeRoute';

  static _i6.PageInfo page = _i6.PageInfo(
    name,
    builder: (data) {
      return const _i3.HomeScreen();
    },
  );
}

/// generated route for
/// [_i4.LibraryScreen]
class LibraryRoute extends _i6.PageRouteInfo<void> {
  const LibraryRoute({List<_i6.PageRouteInfo>? children})
      : super(
          LibraryRoute.name,
          initialChildren: children,
        );

  static const String name = 'LibraryRoute';

  static _i6.PageInfo page = _i6.PageInfo(
    name,
    builder: (data) {
      return const _i4.LibraryScreen();
    },
  );
}

/// generated route for
/// [_i5.MoreScreen]
class MoreRoute extends _i6.PageRouteInfo<void> {
  const MoreRoute({List<_i6.PageRouteInfo>? children})
      : super(
          MoreRoute.name,
          initialChildren: children,
        );

  static const String name = 'MoreRoute';

  static _i6.PageInfo page = _i6.PageInfo(
    name,
    builder: (data) {
      return const _i5.MoreScreen();
    },
  );
}
