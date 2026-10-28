const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

app.get('/', (req, res) => res.send('Bot Aternos dang chay!'));
app.listen(process.env.PORT || 3000, () => console.log('Webserver ready'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'namdeptrai2512.aternos.me',
    port: 32555,
    username: 'BotAternos247',
    version: '1.20.4',
    checkTimeoutInterval: 60000
  });

  // Chặn lỗi check phiên bản 26.3 từ Aternos để tránh crash bot
  bot._client.on('error', (err) => {
    if (err && err.message && err.message.includes('26.3')) return;
  });

  bot.on('spawn', () => {
    console.log('-> Bot da vao server Aternos thanh cong!');
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

  bot.on('error', (err) => {
    if (err && err.message && err.message.includes('26.3')) return;
    console.log('Loi:', err.message || err);
  });
}

createBot();
