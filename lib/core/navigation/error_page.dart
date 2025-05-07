import 'package:flutter/material.dart';

/// A simple error page to display when a route is not found.
class ErrorPage extends StatelessWidget {
  /// Creates an ErrorPage widget.
  ///
  /// [error] is the error message to display.
  /// [stack] is the stack trace associated with the error.
  const ErrorPage({
    super.key,
    required this.error,
    this.stack,
  });

  /// The error message to display.
  final String error;

  /// The stack trace associated with the error.
  final StackTrace? stack;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Error'),
        backgroundColor: Colors.red.shade800,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.error_outline,
                color: Colors.red,
                size: 64,
              ),
              const SizedBox(height: 24),
              Text(
                'Oops! Something went wrong',
                style: Theme.of(context).textTheme.headlineMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                error,
                style: Theme.of(context).textTheme.bodyLarge,
                textAlign: TextAlign.center,
              ),
              if (stack != null) ...[
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  constraints: const BoxConstraints(
                    maxHeight: 200,
                    maxWidth: 600,
                  ),
                  child: SingleChildScrollView(
                    child: Text(
                      stack.toString(),
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            fontFamily: 'monospace',
                          ),
                    ),
                  ),
                ),
              ],
              const SizedBox(height: 32),
              ElevatedButton.icon(
                onPressed: () {
                  Navigator.of(context).pushReplacementNamed('/');
                },
                icon: const Icon(Icons.home),
                label: const Text('Go to Home Page'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
