const admin = require("firebase-admin");
const serviceAccount = require("./website-victoria-arnold-firebase-adminsdk-k00tx-c19540195e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const storage = admin.storage();

module.exports = { firestore, storage };