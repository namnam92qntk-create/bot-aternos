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
    version: '26.3', // Khai báo chính xác phiên bản 26.3 trên Aternos
    checkTimeoutInterval: 60000
  });

  bot.once('spawn', () => {
    console.log('=== > BOT DA VAO SERVER THUC TE THANH CONG! <===');
    
    // Treo máy xoay và nhảy chống AFK
    setInterval(() => {
      if (!bot.entity) return;
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 20000);
  });

  bot.on('end', () => {
    console.log('-> Bot mat ket noi, dang thu lai sau 15s...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Loi:', err.message || err);
  });
}

createBot();
