# Contributing

Thank you for your interest in contributing to this project! This guide will
help you get started.

## Getting Started

### Prerequisites

- Node.js 20+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Java 11+ installed (required for Firestore emulator)
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cloud-platform-junior-test
   ```

2. Install dependencies:
   ```bash
   cd functions
   npm install
   cd ..
   ```

3. Build the functions:
   ```bash
   cd functions
   npm run build
   ```

## Development Workflow

### Running Tests

We use Vitest for unit testing. Run tests with:

```bash
cd functions
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:watch    # Run tests in watch mode
```

### Development Mode

For active development, you can use watch mode to automatically rebuild on
changes:

```bash
cd functions
npm run dev           # Watch and rebuild on file changes
npm run build:watch   # Watch TypeScript files and rebuild
```

### Testing with Firebase Emulator

For local testing without deploying to a real Firebase project:

1. Navigate to the emulator directory:
   ```bash
   cd _emulator
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Build the functions:
   ```bash
   cd ../functions
   npm run build
   cd ../_emulator
   ```

4. Start the emulators:
   ```bash
   npm run emulators:start
   ```

5. In another terminal, run the test script:
   ```bash
   cd _emulator
   npm test
   ```

6. Check the emulator UI at http://localhost:4000

See `_emulator/README.md` for detailed emulator setup instructions.

## Code Style

- Follow the existing code style and patterns
- Use TypeScript for all new code
- Ensure all code passes TypeScript compilation (`npm run build`)
- Write clear, descriptive variable and function names
- Add comments for complex logic

## Making Changes

### Before You Start

1. Read the [TASK.md](TASK.md) file to understand the problem
2. Review the existing codebase to understand the structure
3. Run the existing tests to ensure they pass

### Fixing the Bug

1. **Investigate**: Use the Firebase Emulator to observe the function's behavior
   - Watch the emulator logs to see how many times the function executes
   - Check Firestore data to see if documents are being updated repeatedly
   - Use the test script in `_emulator/` to create sample data

2. **Identify**: Determine the root cause of the excessive writes

3. **Fix**: Implement a minimal, correct solution
   - Your fix should prevent unnecessary updates
   - Ensure the extension still works correctly for legitimate updates
   - Follow existing code patterns

4. **Test**: Verify your fix works
   - Run unit tests: `npm test`
   - Test with the emulator to ensure no infinite loops
   - Verify that legitimate updates still work correctly

### Writing Tests

- Tests should verify the capitalization logic works correctly
- Consider edge cases (empty strings, already capitalized values, etc.)
- Ensure tests pass before submitting

## Submitting Your Fix

### Pull Request Process

1. Create a Pull Request with your fix

2. In your PR description, include:
   - **Root Cause**: A brief explanation of what was causing the bug
   - **Solution**: How your fix addresses the issue
   - **Testing**: What testing you performed to verify the fix
   - Any additional notes or considerations

3. Ensure your code:
   - Follows the existing style
   - Passes all tests
   - Compiles without errors
   - Works correctly with the Firebase Emulator

### PR Description Template

```markdown
## Root Cause

[Explain what was causing the excessive writes]

## Solution

[Describe your fix and how it prevents the issue]

## Testing

[Describe the testing you performed]

- [ ] Unit tests pass
- [ ] Tested with Firebase Emulator
- [ ] Verified no infinite loops occur
- [ ] Verified legitimate updates still work
```

## What We're Looking For

- **Understanding**: Can you identify the root cause of the problem?
- **Solution Quality**: Is your fix clean, minimal, and correct?
- **Code Quality**: Does your code follow the existing style and best practices?
- **Communication**: Can you clearly explain the problem and your solution?

## Getting Help

If you have questions or need clarification:

- Review the [README.md](README.md) for setup instructions
- Check [TASK.md](TASK.md) for the problem description
- Review the emulator logs for debugging information

## License

By contributing, you agree that your contributions will be licensed under the
same license as the project (Apache-2.0).
