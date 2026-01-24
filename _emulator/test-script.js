const admin = require("firebase-admin");

admin.initializeApp({
  projectId: "demo-no-project",
});

const db = admin.firestore();
db.settings({
  host: "localhost:8082",
  ssl: false
});

db.collection("users").doc("test-1").set({
  title: "mr",
  firstName: "jacob",
  lastName: "cable",
  email: "test@example.com",
}).then(() => {
  console.log("Test user created!");
  process.exit(0);
});
