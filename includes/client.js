const chalk = require('chalk');
const config = require('../config/settings.js');

module.exports = async ({
  client,
  msg,
  store
}) => {
  try {
    const body = msg.mtype === 'conversation' ? msg.message.conversation : msg.mtype === 'extendedTextMessage' ? msg.message.extendedTextMessage.text : '';
    const budy = typeof msg.text === 'string' ? msg.text : '';
    const isCommand = body.startsWith(config.prefix) ? body.replace(config.prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
    const command = isCommand.replace(config.prefix, '');
    const args = body.trim().split(/ +/).slice(1);
    const query = q = args.join(' ');
    const query1 = q1 = query.split('|')[0];
    const query2 = q2 = query.split('|')[1];
    const quoted = msg.quoted ? msg.quoted : msg;

    if (!config.public_mode) {
      if (!msg.key.fromMe) {
        return;
      };
    };

    if (msg.message) {
      client.readMessages([msg.key]);

      console.log(
        chalk.bgMagenta(' [New Message] '),
        chalk.cyanBright('Time: ') + chalk.greenBright(new Date()) + '\n',
        chalk.cyanBright('Message: ') + chalk.greenBright(budy || msg.mtype) + '\n' +
        chalk.cyanBright('From:'), chalk.greenBright(msg.pushName), chalk.yellow('- ' + msg.sender.split('@')[0]) + '\n' +
        chalk.cyanBright('Chat Type:'), chalk.greenBright(!msg.isGroup ? 'Private Chat - ' + chalk.yellow(client.user.id.split(':')[0]) : 'Group Chat - ' + chalk.yellow(msg.chat.split('@')[0]))
      );
    };

    if (!body.startsWith(config.prefix) || body === config.prefix) {
      return;
    };

    switch (command) {
      case 'test': {
        msg.reply('Ok, Success!');
        break;
      };
      
      case 'react': {
        const emoji = query ? query : '🗿';
        
        client.sendMessage(msg.chat, {
          react: {
            text: emoji,
            key: msg.key,
          },
        });
        break;
      };
      
      case 'text': {
        client.sendMessage(msg.chat, {
          text: 'Text'
        }, {
          quoted: quoted
        });
        break;
      };
      
      case 'document': {
        client.sendMessage(msg.chat, {
          document: {
            url: 'https://cdn.danitechno.com/daniapi/img/banner.jpeg'
          },
          fileName: 'example.jpeg',
          mimetype: 'image/jpeg'
        }, {
          quoted: quoted
        });
        break;
      };
      
      case 'image': {
        client.sendMessage(msg.chat, {
          image: {
            url: 'https://cdn.danitechno.com/daniapi/img/banner.jpeg'
          },
          caption: 'Image'
        }, {
          quoted: quoted
        });
        break;
      };
      
      case 'video': {
        client.sendMessage(msg.chat, {
          video: {
            url: 'https://dtubein.danitechno.com/uploads/videos/lv_7175020052696091906_20230628222944_64b4e41f00726.mp4'
          },
          caption: 'Video'
        }, {
          quoted: quoted
        });
        break;
      };
      
      case 'audio': {
        client.sendMessage(msg.chat, {
          audio: {
            url: 'https://cdn.danitechno.com/audio/dj-joanna-breakbeat.mp3'
          },
          mimetype: 'audio/mpeg',
          ptt: false
        }, {
          quoted: quoted
        });
        break;
      };
      
      case 'voice': {
        client.sendMessage(msg.chat, {
          audio: {
            url: 'https://cdn.danitechno.com/audio/dj-joanna-breakbeat.mp3'
          },
          mimetype: 'audio/mpeg',
          ptt: true
        }, {
          quoted: quoted
        });
        break;
      };
      
      default: {
        msg.reply(`Command: *${config.prefix}${command}*, tidak tersedia!`);
      };
    };
  } catch (error) {
    msg.reply('Terjadi kesalahan pada server.');
    console.error(error);
  };
};