const nodemailer = require('nodemailer');
const path = require('path');

const { host, port, user, pass } = require('../config/mail.json');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });                   

  transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resource/mail/')
    },
    viewPath: path.resolve('./src/resource/mail/'),
    extName: '.html',
  }));

  module.exports = transport;