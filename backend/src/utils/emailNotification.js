const nodemailer = require('nodemailer');

const sendNotification = async (moderatorEmail, articleTitle) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  let info = await transporter.sendMail({
    from: '"SERC Moderation" <your-email@gmail.com>',
    to: moderatorEmail,
    subject: 'New Article for Moderation',
    text: `A new article titled "${articleTitle}" has been submitted for moderation.`,
  });

  console.log('Message sent: %s', info.messageId);
};

module.exports = { sendNotification };
