const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

// Webserver nho giu cho Render luon Live
app.get('/', (req, res) => res.send('Bot Aternos dang chay!'));
app.listen(process.env.PORT || 3000, () => console.log('Webserver ready'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'namdeptrai2512.aternos.me', // IP Aternos cua ban
    port: 25565,
    username: 'BotAternos247',        // Ten nhan vat Bot
    version: '1.20.6'
  });

  bot.on('spawn', () => {
    console.log('-> Bot da vao server Aternos thanh cong!');
    // Xoay va nhay chong kick AFK
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 20000);
  });

  bot.on('end', () => {
    console.log('-> Bot mat ket noi, dang ket noi lai...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', err => console.log('Loi:', err));
}

createBot();
