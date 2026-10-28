const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

app.get('/', (req, res) => res.send('Bot Aternos đang chạy!'));
app.listen(process.env.PORT || 3000, () => console.log('Webserver ready'));

function startBot() {
  console.log('-> Đang tiến hành kết nối tới Aternos...');
  
  const bot = mineflayer.createBot({
    host: 'namdeptrai2512.aternos.me',
    port: 32555,
    username: 'BotAternos247',
    version: '1.20.6'
  });

  bot.on('login', () => {
    console.log('=== > BOT ĐÃ ĐĂNG NHẬP THÀNH CÔNG! <===');
  });

  bot.on('spawn', () => {
    console.log('=== > BOT ĐÃ VÀO GAME THÀNH CÔNG! <===');
    setInterval(() => {
      if (!bot.entity) return;
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 15000);
  });

  bot.on('end', (reason) => {
    console.log('-> Bot ngắt kết nối (' + reason + '). Thử lại sau 10 giây...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('-> Lỗi:', err.message || err);
  });
}

// Gọi chạy bot ngay lập tức
startBot();
