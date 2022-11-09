const mineflayer = require('mineflayer');
/* const mineflayerViewer = require('prismarine-viewer').mineflayer */

const bot = mineflayer.createBot({
    host: 'localhost',
    port: 51082,
    version: "1.18.2",
    username: `Hehuar${Math.round(Math.random() * 100)}`
})

bot.once('spawn', function() {
    bot.chat('Hey, bitches');
    bot.loadPlugin(require("mineflayer-autoclicker"));
    /* mineflayerViewer(bot, {
        port: 3000,
        firstPerson: true,
        viewDistance: "25"
    }) */
})

bot.on('sleep',()=>{
    bot.chat("Muuuuuuum, I don't want to sleep");
});
bot.on('wake',() => {
    bot.chat("Muuuuuuum, I don't want to wake up");
});

async function goToSleep(){
    const bed = bot.findBlock({
        matching: block => bot.isABed(block)
    })

    if (bed) {
        try {
            await bot.sleep(bed);
            bot.chat("Sleeping");
        } catch (e) {
            bot.chat(`I can't fall asleep: ${e.message}`);
        }
    } else {
        bot.chat('No bed around');
    }
}

async function wakeUp() {
    try {
        await bot.wake();
    } catch (e) {
        bot.chat(`I can't wake up: ${e.message}`);
    }
}

function tossNext() {
    if(bot.inventory.items().length === 0) {
        bot.chat("I'm empty inside...");
    } else {
        const item = bot.inventory.items()[0];
        bot.tossStack(item, tossNext);
    }
}

bot.on('chat', function(username, message) {
    if(username === bot.username) return;
    if(message[0].toLowerCase() !== 'b') return;
    else message = message.toLowerCase().replace('b ', '');
    
    switch (message){
        case 'ты бот?':
            setTimeout(() => bot.chat(username + ", wuuuuut? Noooo... no. nope. nah"), 5000);
            break;
        case 'sleep':
            goToSleep();
            break;
        case 'wake up':
            wakeUp();
            break;
        case 'leave':
            bot.quit;
            break;
        case 'drop':
            tossNext();
            break;
        case 'start':
            bot.autoclicker.start();
            break;
        case 'stop':
            bot.autoclicker.stop();
            break;
        default:
            bot.chat(username + ", you'd better write somthing helpful");
            break;
    }
})