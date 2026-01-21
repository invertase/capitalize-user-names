# Task: Fix the Excessive Firestore Writes Bug

## Technical Background

**Cloud Functions for Firebase** are serverless functions that run in response
to events (e.g., database changes, HTTP requests). They automatically scale and
you only pay for what you use. →
[Cloud Functions documentation](https://firebase.google.com/docs/functions)

**Firebase Extensions** are pre-packaged solutions that automate common tasks
using Cloud Functions. They can be configured and deployed without writing code
from scratch. →
[Firebase Extensions documentation](https://firebase.google.com/docs/extensions)

This repository contains a Firebase Extension that uses a Firestore-triggered
Cloud Function to automatically capitalize user names.

---

## The Problem

A customer has reported a critical issue with this Firebase extension. Read
their bug report below:

---

### Bug Report

**Subject:** Extension causing excessive Firestore writes and high costs

Hi! I installed this extension a few days ago and I'm seeing some concerning
behavior. My Firestore write costs have skyrocketed - I'm seeing hundreds of
writes per day when I should only be seeing a handful.

This is really impacting my Firebase costs and I'm worried it's going to get
worse. Has anyone else experienced this?

**Expected Behavior:**

The extension should:

- Trigger when a user document is created or updated in the `users` collection
- Capitalize the `title`, `firstName`, and `lastName` fields if they're not
  already capitalized
- Create a combined `name` field from these parts (e.g., "Mr Jacob Cable")
- Only update the document once per user action
- Not cause excessive writes or costs

**Actual Behavior:**

- The extension seems to be running continuously
- Firestore write costs are much higher than expected (hundreds of writes per
  day)
- Documents are being updated even when I haven't made any changes

**Steps to Reproduce:**

1. Install and configure the extension
2. Create a new user document:
   ```javascript
   db.collection("users").doc("test-1").set({
     title: "mr",
     firstName: "john",
     lastName: "smith",
     email: "test@example.com",
   });
   ```
3. Check Firestore usage metrics - writes are much higher than expected!!

---

## Your Task

1. Draft a brief initial response to the customer. This would normally be in a
   reply to the issue, but you can just add a RESPONSE.md to the repo and put it
   there.
2. Investigate the codebase to identify the root cause of this bug
3. Fix the bug so the extension works correctly without causing excessive writes
4. Submit your solution as described below

## Submission Instructions

1. Click to use this template repository as a **private** repository
2. Investigate and fix the bug
3. Create a Pull Request with your fix
4. In your PR description, include:
   - A brief explanation of the root cause
   - How your fix addresses the issue
   - Any demonstration/verification of the fix

## What We're Looking For

- Understanding: Can you identify the root cause of the problem?
- Solution Quality: Is your fix clean, minimal, and correct?
- Code Quality: Do your code changes follow best practices?
- Communication: Can you clearly explain the problem and your solution, and
  demonstrate the solution works?

## Helpful Tips

- **IMPORTANT**: The Firebase Emulator Suite is a great way to test the
  extension locally without incurring costs!
- This code has intentionally been made pretty verbose and ugly. We're not
  looking for a complete refactor of the code.
- See `_emulator/README.md` for detailed instructions on running the emulators
- The emulator logs will help you observe the function's behavior
- I don't mind if you use AI tools to assist you (in fact i'm interested if you
  have a cool workflow you'd like to demonstrate), what is most important is
  that you understand and can communicate your work well.
- I would like to see semantic/conventional commits:

https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716

https://www.conventionalcommits.org/en/v1.0.0/
