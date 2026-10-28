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

  // Chỉ báo thành công khi thực sự xuất hiện trong thế giới game
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
    console.log('-> Server dang Tat/Offline hoac bi ngat ket noi. Thu lai sau 15s...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    // Thấu kính chặn các thông báo lỗi ảo từ Aternos
    if (err && err.message && (err.message.includes('26.3') || err.message.includes('ECONNRESET'))) {
      return;
    }
    console.log('Loi:', err.message || err);
  });
}

createBot();
