import 'package:flutter/material.dart';

class ScaleTap extends StatefulWidget {
  final Widget child;
  final Duration duration;
  final double scaleFactor;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;

  const ScaleTap({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 100),
    this.scaleFactor = 0.94,
    this.onTap,
    this.onLongPress,
  });

  @override
  State<ScaleTap> createState() => _ScaleTapState();
}

class _ScaleTapState extends State<ScaleTap>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
      reverseDuration: widget.duration,
    );
    _animation =
        Tween<double>(begin: 1.0, end: widget.scaleFactor).animate(_controller);
    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    _controller.forward();
  }

  void _handleTapUp(TapUpDetails details) {
    _controller.reverse();
    widget.onTap?.call();
  }

  void _handleTapCancel() {
    _controller.reverse();
  }

  void _handleLongPress() {
    widget.onLongPress?.call();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      onLongPress: _handleLongPress,
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Transform.scale(
            scale: _animation.value,
            child: widget.child,
          );
        },
        child: widget.child,
      ),
    );
  }
}
