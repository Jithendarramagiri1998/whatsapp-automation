const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Generate QR Code for authentication
client.on('qr', qr => {
    console.log('Scan the QR code below to log in:');
    qrcode.generate(qr, { small: true });
});

// Notify when the bot is ready
client.on('ready', () => {
    console.log('WhatsApp Bot is running and ready!');
});

// Handle incoming messages
client.on('message', async msg => {
    try {
        console.log(`Received message from ${msg.from}: ${msg.body}`);

        if (msg.body.toLowerCase() === 'hi') {
            await msg.reply('Hello! How can I help you?');
        } else if (msg.body.toLowerCase() === 'help') {
            await msg.reply('Available commands:\n1. hi - Say Hello\n2. help - List available commands');
        } else if (msg.hasQuotedMsg) {
            try {
                const quotedMsg = await msg.getQuotedMessage();
                await msg.reply(`You replied to: ${quotedMsg.body}`);
            } catch (error) {
                console.error('Error retrieving quoted message:', error);
                await msg.reply('Sorry, I could not retrieve the quoted message.');
            }
        } else {
            await msg.reply("I'm still learning! Try another message.");
        }
    } catch (error) {
        console.error('Error handling message:', error);
        await msg.reply('An error occurred while processing your message. Please try again.');
    }
});

// Handle authentication failures
client.on('auth_failure', msg => {
    console.error('Authentication failed:', msg);
});

// Handle unexpected disconnections
client.on('disconnected', reason => {
    console.log('WhatsApp Bot disconnected:', reason);
});

// Start the bot
client.initialize();
