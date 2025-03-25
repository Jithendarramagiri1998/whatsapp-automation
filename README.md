# WhatsApp Bot Setup Guide

## Prerequisites
Before setting up the WhatsApp bot, ensure you have the following:
- A Linux-based server (Amazon Linux, Ubuntu, or CentOS preferred)
- Node.js installed (>=16.x recommended)
- PM2 process manager installed
- WhatsApp Web API configured

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/whatsapp-bot.git
cd whatsapp-bot
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Bot
Start the WhatsApp bot manually to check if it works:
```sh
node whatsapp-bot.js
```
If you see `WhatsApp Bot is running and ready!`, the bot is working correctly.

### 4. Run the Bot in Background Using PM2
Install PM2 globally (if not installed):
```sh
npm install -g pm2
```

Start the bot with PM2:
```sh
pm2 start whatsapp-bot.js --name whatsapp-bot
```

### 5. Check Bot Status
```sh
pm2 list
```
Expected output:
```
┌────┬───────────────┬─────────┬──────┬──────────┐
│ id │ name          │ status  │ cpu  │ mem      │
├────┼───────────────┼─────────┼──────┼──────────┤
│ 0  │ whatsapp-bot  │ online  │ 0%   │ 52.5mb   │
└────┴───────────────┴─────────┴──────┴──────────┘
```

### 6. Enable Auto Restart on System Reboot
```sh
pm2 save
pm2 startup
```
This will generate a command. Copy and execute it to enable PM2 as a system service.

### 7. Viewing Logs
Check real-time logs:
```sh
pm2 logs whatsapp-bot
```

### 8. Stopping & Restarting the Bot
To stop the bot:
```sh
pm2 stop whatsapp-bot
```
To restart the bot:
```sh
pm2 restart whatsapp-bot
```
To delete the bot process from PM2:
```sh
pm2 delete whatsapp-bot
```

## Troubleshooting

### Bot Stopped After Closing Terminal
Ensure PM2 is running:
```sh
pm2 resurrect
```

### Checking for Errors
Check error logs:
```sh
pm2 logs whatsapp-bot --err
```

### Bot is Not Starting
Try reinstalling dependencies:
```sh
npm install
```
Then restart PM2:
```sh
pm2 restart whatsapp-bot
```

## Conclusion
Your WhatsApp bot is now set up and running in the background using PM2. It will restart automatically after a system reboot, and logs can be monitored for debugging. 🚀
