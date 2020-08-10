const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.inboundSMS = functions.https.onRequest(async (req, res) => {
    await admin.database().ref('/msgq').push(req.body);
    res.send(200);
  });