// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

// Sendgrid Config
import * as sgMail from '@sendgrid/mail';


const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

exports.inboundSMS = functions.https.onRequest(async (req, res) => {
  await admin.database().ref('/msgq').push(req.body);
  res.send(200);
});


// Sends email to user after signup
export const welcomeEmail = functions.auth.user().onCreate(user => {
  const msg = {
    to: user.email,
    from: 'admin@agrocropes.com',
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      name: user.displayName,
    },
  };

  return sgMail.send(msg);

});