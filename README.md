# Capitalize User Names Extension

A Firebase extension that automatically capitalizes the `title`, `firstName`,
and `lastName` fields in user documents stored in Firestore, and combines them
into a `name` field.

## Overview

This extension listens for document writes in the `users` collection and ensures
that the `title`, `firstName`, and `lastName` fields are properly capitalized
(e.g., "mr" → "Mr", "jacob" → "Jacob", "cable" → "Cable"). It also creates a
combined `name` field from these parts (e.g., "Mr Jacob Cable").

## Setup

### Prerequisites

- Node.js 20+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase project with Firestore enabled
- Billing enabled (required for Cloud Functions)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd capitalize-user-names-extension
   ```

2. Install dependencies:
   ```bash
   cd functions
   npm install
   cd ..
   ```

3. Login to Firebase:
   ```bash
   firebase login
   ```

4. Initialize Firebase (if not already done):
   ```bash
   firebase init
   ```

5. Deploy the extension:
   ```bash
   firebase deploy --only extensions
   ```

   During deployment, you'll be prompted to:
   - Select your Firebase project
   - Choose a Cloud Functions location
   - Confirm the extension installation

## Testing

### Option 1: Using Firebase Emulator (Recommended for Development)

For local testing without deploying to a real Firebase project, use the emulator
setup:

1. Navigate to the emulator directory:
   ```bash
   cd _emulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the functions:
   ```bash
   cd ../functions
   npm install
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

6. Check the emulator UI at http://localhost:4000 to see function logs and
   Firestore data.

See `_emulator/README.md` for detailed emulator setup instructions.

### Option 2: Testing with a Real Firebase Project

1. Create a test user document in Firestore:
   ```javascript
   // In Firebase Console or using Admin SDK
   db.collection("users").doc("test-user-1").set({
     title: "mr",
     firstName: "jacob",
     lastName: "cable",
     email: "jacob@example.com",
   });
   ```

2. Check that the fields are automatically capitalized:
   - `title`: "mr" → "Mr"
   - `firstName`: "jacob" → "Jacob"
   - `lastName`: "cable" → "Cable"
   - `name`: "Mr Jacob Cable" (automatically created)

3. Update an existing user:
   ```javascript
   db.collection("users").doc("test-user-1").update({
     firstName: "jane",
     lastName: "smith",
   });
   ```

4. Verify the fields are updated and capitalized correctly

## How It Works

The extension uses a Firestore trigger that fires whenever a document in the
`users` collection is created or updated. The function:

1. Extracts the `title`, `firstName`, and `lastName` fields from the document
2. Capitalizes each field individually (first letter uppercase, rest lowercase)
3. Combines them into a `name` field (e.g., "Mr Jacob Cable")
4. Updates the document with the capitalized fields and combined name

## Project Structure

```
.
├── extension.yaml          # Extension configuration
├── firebase.json           # Firebase project configuration
├── functions/              # Cloud Functions source code
│   ├── src/
│   │   └── index.ts       # Main function implementation
│   ├── package.json       # Function dependencies
│   └── tsconfig.json      # TypeScript configuration
├── _emulator/              # Firebase emulator setup for local testing
│   ├── firebase.json      # Emulator configuration
│   ├── test-script.js     # Test script to create sample data
│   └── README.md          # Emulator setup instructions
└── README.md              # This file
```

## Known Issues

See [TASK.md](TASK.md) for reported issues with this extension.

## License

Apache-2.0
