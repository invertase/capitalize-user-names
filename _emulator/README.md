# Firebase Emulator Setup

This directory contains a demo Firebase project for testing the extension
locally using the Firebase Emulator Suite.

## Prerequisites

- Node.js 20+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Java 11+ installed (required for Firestore emulator)

## Setup Instructions

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase** (optional, but recommended):
   ```bash
   firebase login
   ```

3. **Install dependencies**:
   ```bash
   cd ../functions
   npm install
   cd ../_emulator
   ```

4. **Start the emulators**:
   ```bash
   firebase emulators:start
   ```

   This will start:
   - Firestore Emulator (port 8080)
   - Functions Emulator (port 5001)
   - Emulator UI (port 4000)

5. **Open the Emulator UI**: Navigate to http://localhost:4000 in your browser
   to view the emulator dashboard.

## Testing the Extension

### 1. Create a test user document

You can use the Firebase Console in the Emulator UI, or use the Admin SDK:

```javascript
// In Node.js or browser console
const admin = require("firebase-admin");
admin.initializeApp({
  projectId: "demo-test",
});

const db = admin.firestore();
db.collection("users").doc("test-1").set({
  title: "mr",
  firstName: "jacob",
  lastName: "cable",
  email: "test@example.com",
});
```

Or use the REST API:

```bash
curl -X POST http://localhost:8080/v1/projects/demo-test/databases/(default)/documents/users \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "title": {"stringValue": "mr"},
      "firstName": {"stringValue": "jacob"},
      "lastName": {"stringValue": "cable"},
      "email": {"stringValue": "test@example.com"}
    }
  }'
```

### 2. Check the Functions logs

Watch the terminal where you started the emulators. You should see logs from the
function execution.

### 3. Verify the document was updated

Check the Firestore data in the Emulator UI or query it:

```bash
curl http://localhost:8080/v1/projects/demo-test/databases/(default)/documents/users/test-1
```

### 4. Observe the bug

If the extension has the infinite loop bug, you'll see:

- Multiple function executions in the logs
- The document being updated repeatedly
- High write counts in the emulator UI

## Troubleshooting

### Port already in use

If you get port conflicts, you can specify different ports in `firebase.json`:

```json
{
  "emulators": {
    "firestore": {
      "port": 8081
    },
    "functions": {
      "port": 5002
    },
    "ui": {
      "port": 4001
    }
  }
}
```

### Java not found

Make sure Java 11+ is installed:

```bash
java -version
```

If not installed:

- macOS: `brew install openjdk@11`
- Linux: `sudo apt-get install openjdk-11-jdk`
- Windows: Download from [AdoptOpenJDK](https://adoptium.net/)

### Functions not deploying

Make sure you've built the functions:

```bash
cd ../functions
npm run build
```

## Cleaning Up

To reset the emulator data:

1. Stop the emulators (Ctrl+C)
2. Delete the `.firebase` directory in this folder
3. Restart the emulators

## Next Steps

Once you've identified the bug, fix it in `../functions/src/index.ts` and test
again using the emulator.
