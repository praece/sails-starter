/**
 * To use Office365 you need to set up your own nodemailer transport because
 * Office365 isn't yet in the list of known providers. Use the code below to
 * set up your own transport.
 *
 * 
 * var smtpPool = require('nodemailer-smtp-pool');
 * 
 * var smtpOptions = {
 * 	host: 'smtp.office365.com',
 *  port: '587',
 * 	auth: {
 *     user: process.env.EMAIL_USER,
 *     pass: process.env.EMAIL_PASS
 *  },
 *  secureConnection: 'false',
 *  tls: { ciphers: 'SSLv3' }
 * };
 * 
 * var email = {
 *   transporter: smtpPool(smtpOptions),
 *   from: process.env.EMAIL_USER,
 *   testMode: false
 * };
 *
 */

var email = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  from: process.env.EMAIL_USER,
  testMode: false
}

if (process.env.ALWAYS_SEND_TO) email.alwaysSendTo = process.env.ALWAYS_SEND_TO;

module.exports.email = email;
