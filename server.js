const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const randomPuppy = require('random-puppy');
const superagent = require("superagent");
const ms = require("ms");
const fs = require("fs");
const hastebin = require('hastebin-gen');
const urban = require('relevant-urban');
const math = require('mathjs');
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');
const translate = require('google-translate-api');
const GoogleSearch = require('google-search');
const google = require('google');
const profanities = require('profanities');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YT_API);
const queue = new Map();
const moment = require('moment');
require('moment-duration-format');
const meme = require('memejs');

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`on ${client.channels.size} servers`);
});
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setGame(`on ${client.guilds.size} `);
});
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setGame(`on Dis Cord`);
});
client.on('guildMemberAdd', member => {

    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    
    channel.send(` ${member}, Has joined the Fray... Poor Person`);
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const prefix = config.prefix
if(message.guild.id == "451843103318343680"){
message.channel.send("services discontinued for https://discordapp.com/channels/451843103318343680/457677144470847500 please head to discord.gg/TYxxaVn to use the bot.");
	return
}else{
	if(message.author.id === "447259439439937547") return message.channel.send("Permission denied.");
	if(message.author.id === "395386053831426048") return message.channel.send("Permission denied.");
	if(message.author.id === "352250257389912064") return message.channel.send("Permission denied.");
	if(message.author.id === "350693449722232832") return message.channel.send("Permission denied.");
    const sql = require("sqlite");
    sql.open("./cash.sqlite");

    sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO money (userId, cash, bank) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        } else {
            let cBank = Math.floor(0.1 * Math.sqrt(row.cash + 1));
            if (cBank > row.cash) {
                row.bank = cBank;
                sql.run(`UPDATE money SET cash = ${row.cash + 1}, bank = ${row.bank} WHERE userId = ${message.author.id}`);
                message.reply(`You've Now got **${cBank}**! What a rich boi?`);
            }
            sql.run(`UPDATE money SET cash = ${row.cash + 1} WHERE userId = ${message.author.id}`);
        }
    }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS money (userId TEXT, cash INTEGER, bank INTEGER)").then(() => {
            sql.run("INSERT INTO money (userId, cash, bank) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        });
    });

    if (command === "balc") {
        sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("Your pocket money is 0");
            message.reply(`You have ${row.cash} in cash, GLORiOUS`);
        });
    }

    if (command === "balb") {
        sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("You're broke as hell!");
            message.reply(`you have banked a total of ${row.bank}!`);

        })
    }
    if (command === "addc") {
        if (message.author.id != "347885325940424714") {
            message.channel.send("Ok so like, this is embarrasing, ik. but i forgot how to check members for permissions. so youre gonna have to sit here for a min.")
            return
        } else {

            const camt = args[1]
            let defineduser = message.mentions.users.first() || message.author;
            defineduser = defineduser.id;
            sql.get(`SELECT * FROM money WHERE userId ="${defineduser}"`).then(row => {
                if (!row) {
                    sql.run("INSERT INTO money (userId, cash, bank) VALUES (?, ?, ?)", [defineduser, 1, 0]);
                } else {
                    const rrow = parseInt(row.cash)
                    const ccrow = parseInt(camt)
                    console.log(`${row.cash}`)
                    console.log(`${rrow}`)
                    sql.run(`UPDATE money SET cash = ${rrow + ccrow} WHERE userId = ${defineduser}`);
                    message.channel.send("added " + `${camt}` + " dollars to" + "<@" + `${defineduser}` + ">");
                }
            })
        }
    }


    if (command === "addb") {
        if (message.author.id != "347885325940424714") {
            message.channel.send("Ok so like, this is embarrasing, ik. but i forgot how to check members for permissions. so youre gonna have to sit here for a min.")
            return
        } else {

            const camt = args[1]
            let defineduser = message.mentions.users.first() || message.author;
            defineduser = defineduser.id;
            sql.get(`SELECT * FROM money WHERE userId ="${defineduser}"`).then(row => {
                if (!row) {
                    sql.run("INSERT INTO money (userId, cash, bank) VALUES (?, ?, ?)", [defineduser, 1, 0]);
                } else {
                    const rrow = parseInt(row.bank)
                    console.log(`${row.bank}`)
                    console.log(`${rrow}`)
                    sql.run(`UPDATE money SET bank = ${rrow + camt} WHERE userId = ${defineduser}`);
                    message.channel.send("added " + `${camt}` + " dollars to" + "<@" + `${defineduser}` + ">");
                }
            })
        }
    }
    if (command === "deposit") {
        if (message.author.id != "347885325940424714") {
            message.channel.send("Ok so like, this is embarrasing, ik. but i forgot how to check members for permissions. so youre gonna have to sit here for a min.")
            return
        } else {
            sql.get(`SELECT * FROM money WHERE userId ="${message.author.id}"`).then(row => {
                if (!row) {
                    sql.run("INSERT INTO money (userId, cash, bank) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
                } else {
                    const rrow = parseInt(row.cash)
                    const brow = parseInt(row.bank)
                    console.log(`${row.bank}`);
                    console.log(`${brow}`);
                    console.log(`${row.cash}`);
                    console.log(`${rrow}`);
                    sql.run(`UPDATE money SET bank = ${rrow + brow} WHERE userId = ${message.author.id}`);
                    sql.run(`UPDATE money SET cash = ${rrow - rrow} WHERE userId = ${message.author.id}`)
                    message.channel.send("Added all money to bank. Your balance is now" + `${row.bank}`)

                }
            })
        }
    }




    if (command === "daecade") {
        message.channel.send("***STAGE 1:*** \n A bright flash of light blinds you. You place your hands in front of your face to protect your eyes. Never before has this been seen. A smoke plume erupts from the ground. You have four choices,\n 1) End it here and now. \n 2)Head north to the door \n 3) You head south to the bunker \n 4) You stand where you are by the window staring in awe at the magnificent light. \n respond by typing 1, 2, 3, or 4.");
        try {
            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 5, {
                maxMatches: 1,
                time: 30000,
                errors: ['time']
            });
        } catch (err) {
            console.error(err);
		console.log(response);
            return message.channel.send('No or invalid value entered, quitting game.');
        }
        var videoIndex = parseInt(response.first().content);
        if (videoIndex == 1) {
            message.channel.send("You chose to commit suicide. Game Over...");
            return
       }
        if (videoIndex == 2) {
		
            message.channel.send("***STAGE 2:*** \n You are at the door. You have two choices, \n 1) Open the door, and walk outside. \n 2)Go back ")
            try {
                var opttsto = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 30000,
                    errors: ['time']
                });
		    
            } catch (err) {
                console.error(err);
                return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
            }
        
	    var opttstoIndex = parseInt(opttsto.first().content);
	    if(opttstoIndex == 1){
		    message.channel.send("You Walk Outside, you will have one quarter the usual time to make your moves until you find safehaven. You may \n 1) stay outside, \n 2) head back inside")
	  try{
	  var a = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 7500,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
	    }
	    
	var aIndex = parseInt(a.first().content);
	if(aIndex == 1){
	message.channel.send("In a state of paralysis, you stand with fear. The word grows brighter, hotter. The wall of head approaches you. You are flung into the air by a massive gust of wind. Moments later, your skin begins to boil, then burn. Turning black, before vanishing into the ashes around. Game Over...")
	return
	}
	if(aIndex == 2){
	message.channel.send("You return inside, the wall of flames draws nearer. You have half the normal time to make your move.  1) End it here and now. \n 2) You head south to the bunker \n 3) You stand where you are by the window staring in awe at the magnificent light. \n respond by typing 1, 2,or 3.")
	   try{
	   var aa = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 15000,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
}


	var aaIndex = parseInt(a.first().content);
		
		    if(aaIndex == 1){
		    message.channel.send("You commit suicide. Game over...");
			    return
			    
		    }
	if(aaIndex == 2){
	message.channel.send("You arrive at the underground concrete bunker entrance.\n 1) You may choose to gather supplies, but your next move will have half the usual time to respond, \n 2)Or you can enter the bunker immediately.");
	try{
	
	 var bb = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 15000,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
	    }

	var bbIndex = parseInt(bb.first().content);
	if(bbIndex == 1){
	message.channel.send("You grab a wooden plank, one pack of gauze, and 3 cans of food.You now enter the Bunker. Once you seal it shut, you begin to feel the floor rattle. The rattle turns into a roar. You fall down unable to keep your balance. Your supplies go all over the floor. After 3 minutes, the rumbling stops. You notice very faint cracks in the walls of the bunker. You have 3 choices, \n 1) sleep \n 2) Go upstairs again \n 3) explore");
	try{
	
	 var bbb = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 45000,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
	    }

	var bbbIndex = parseInt(bbb.first().content);
	if(bbbIndex === 1){
	///sleep
	message.channel.send("After all the chaos, you find your eyelids growing heavy. You place a roll of cloth on the stone floor, and you close your eyes. Images of today flashing across the back. Your mind races, *'Is my family alive' 'Is there anyone else?' 'What do I do now?' 'Is this it?' 'What about... Her...'* Gradually, your thoughts fade into darkness, and you fall asleep. 2x time bonus. answer increased to 60s for two turns. When you awake in the morning, you have two choices, \n 1) Go upstairs \n 2) Explore.")
	try{
	
	 var sleep = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 60000,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
	    }
	    
var sleepIndex = parseInt(sleep.first().content);
	if(sleepIndex == 1){
	message.channel.send("You decide to open the vault doors. As soon as you do, air rushes in. You exit the vault. You notice the world glowing a faint green. **TIME REDUCED TO 10 SECOND DUE TO RADIOACTIVITY ☢** \n 1)Go back in \n 2) Stay.")
		try{
	
	 var goup = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 10000,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
	    }
	    
var goupIndex = parseInt(goup.first().content);
if(goupIndex ===1){
message.channel.send("You return inside. But it is too late. You were outside too long. You feel your innards churning. Every aspect of life now seems more vivid. For a time. Then it all fades. Unable to focus on any object. Your vision turns dark. Jumpin in and out of focus. You collapse on the ground. Your resolve. Gone.")

}
if(goupIndex===2){
message.channel.send("You choose to stay outside. Time reduced to 5 seconds.\n 1) stay\n 2) go inside")
	try{
	
	 var stup = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 5000,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
	    }
	    
var stupIndex = parseInt(stup.first().content);
if(stupInedx==1){
message.channel.send("You return inside. But it is too late. You were outside too long. You feel your innards churning. Every aspect of life now seems more vivid. For a time. Then it all fades. Unable to focus on any object. Your vision turns dark. Jumpin in and out of focus. You collapse on the ground. Your resolve. Gone.")
}
if(stupIndex==2){
message.channel.send("Despite the gruesome agony you are enduring. You choose to remain. Your skin blisters. Your fingertips turn black. You can feel your tongue swelling in your mouth. Eyes bulging. Till eventually. YOu collapse, too weak to stay resolute.")
}

}
	}
	if(sleepIndex ===2 ){
	//Xplore
	message.channel.send("You choose to explore the incomplete annoying ass game. Like ffs. this shit takes too long to make XD")
	}

	}
	if(bbIndex == 2){
	message.channel.send("You enter the bunker, and just in time. You are thrown to the ground as a thunderous roar sounds overhead. You are underground, but you still hear the wood splintering overhead. This continues for several minutes, then the roar comes to a cease. You remain still. You look around the room and notice some small cracks in the cement walls. You have 3 choices.\n 1) Sleep \n 2) Go upstairs again, \n 3) explore the bunker.")
	return}
	}
	    if(aaIndex == 3){
message.channel.send("You Stood by the window. The force of the wind shatters the glass into millions of pieces, embedding them in your flesh. Shortly after, The wooden walls begin to splinter, the walls slam into you with such force, that they fly stright through your body. You are rendered unconscious. The light soon fills the room, and the heat eliminates any trace of your existence.")
return
}
}
	if(opttstoIndex == 2){
		message.channel.send("You head back. You have 3 choices 1) End it here and now. \n 2) You head south to the bunker \n 3) You stand where you are by the window staring in awe at the magnificent light. \n respond by typing 1, 2, 3, or 4.");
	    try{
	    var b = await  message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 4, {
                    maxMatches: 1,
                    time: 30000,
                    errors: ['time']
                });
	    }catch (err) {
		    console.error(err);
		    return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
	    }

	var bIndex = parseInt(b.first().content);
if(bIndex === 1){
message.channel.send("***END OF CURRENT LINE***")
}
        if (videoIndex == 3) {
            message.channel.send("You arrive at the underground concrete bunker entrance.\n You may choose to gather supplies, but your next move will have half the usual time to respond, \n 2)Or you can enter the bunker immediately. ***END OF CURRENT LINE***");
            try {
                var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 30000,
                    errors: ['time']
                });
            } catch (err) {
                console.error(err);
                return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
            }
        


        if (videoIndex == 4) {
            message.channel.send("You chose to stand around gawking like a moron. You will have half the usual time to respond to your next move. You may choose \n 1) to repeat this action, \n or head to the bunker.***END OF CURRENT LINE***")
              try {
                var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 3, {
                    maxMatches: 1,
                    time: 30000,
                    errors: ['time']
                });
            } catch (err) {
                console.error(err);
                return message.channel.send('You took too long, or chose an invalid option. The nuclear blast envelops you, and your skin melts. Game Over...');
            }
        }
    }
}
}
}
}
}



    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        const answers = [
            "A porta potty in the Sajara Desert",
            "Utopia",
            "Bugs Bunny's Rabbit Hole",
            "My moms basement",
            "NASA's private server",
            "Santa's sleigh",
            "That thugs wallet",
        ]
        const namaste = [
            "A dog",
            "Jeff",
            "A ••••• wit a rocket launcha",
            "The lost land of Atlantis",
            "That one guy",
            "My money",
        ]
        const randomAnswer = await answers[Math.floor(Math.random() * answers.length)];
        const randomNamaste = await namaste[Math.floor(Math.random() * answers.length)];
        m.edit(`Pong! It took ${m.createdTimestamp - message.createdTimestamp}ms to find ***${randomNamaste}*** in ***${randomAnswer}*** after ${Math.round(client.ping)} counts of felony!!`)

    };

    if (command === "crole") {
        if (message.author.id != "347885325940424714") {
            message.channel.send("In development" + `${message.author.tag}`)
            return
        } else {

            const a = args[0];
            const b = args[1].toUpperCase();
            const c = args[2];
            await message.guild.createRole({
                    name: a,
                    color: b,
                    mentionable: true,
                    remove: "SEND_MESSAGES",
                    remove: "ADD_REACTIONS"
                })
                .catch(console.error)
            console.log(a);

            console.log(b);
            message.channel.send("Role Created");
            const jj = await message.guild.roles.find("name", a);
            const roleSize = await message.guild.roles.find("name", "DaeBot");
            console.log(roleSize.position)
            jj.setPosition(`${roleSize.position - 1}`);
            console.log(roleSize);
            message.channel.send("you need to manage perms manually. Sorry!")
        }
    }

    if (command === "uptime") {
        message.channel.send("The uptime is **" + moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]') + "**")
    }
    if (command === "userinfo") {
        const answers = [
            "A porta potty in the Sajara Desert",
            "Utopia",
            "Bugs Bunny's Rabbit Hole",
            "My moms basement",
            "NASA's private server",
            "Santa's sleigh",
            "That thugs wallet",
            "A hut in North Africa",
            "John Wicks backyard",
            "Jabbas Rancor Pit",
            "The Sewers",
            "An abandoned space shuttle.",
            "A Hobos box",
            "The Krackens Belly"
        ]
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

        let user = message.mentions.users.first()
        if (!user) {
            return message.channel.send(":x: Unknown user!")
        }
        message.channel.send(("", {
            embed: new Discord.RichEmbed()
                .setTitle("**Userinfo**")
                .setColor("#00D4FF")
                .setThumbnail(user.avatarURL)
                .setDescription("Username - **" + user.username + "**\nDiscrim - **" + user.discriminator + "**\nID - **" + user.id + "**\nStatus - **" + user.presence.status + "**\nCreated at - **" + user.createdAt + "\n")
                .setFooter(`LAST SEEN IN ${randomAnswer}`)
        }));
    }
    if (command === "guildlist") {
        message.channel.send(client.guilds.forEach(g => {
            message.channel.send(g.name)
        }))
    }
    if (command === "help") {
        message.author.send("```js\n Economy: \n Add: Ignore This Command It Is In Maintenance \n Addb: adds to balance in bank. Usage: .addb @user [amt] \n Addc: adds cash to a user Usage: .addc @user [amt] \n Bal: Ignore This Command It Is In Maintenance \n Balb: Ignore This Command It Is In Maintenance \n Buy: Ignore This Command It Is In Maintenance \n Daily: Ignore This Command It Is In Maintenance \n Gamble: Ignore This Command It Is In Maintenance \n Gamblec: Ignore This Command It Is In Maintenance \n Robb: Ignore This Command It Is In Maintenance \n```");
        message.author.send("```js\n Fun:\n 8ball: This Command Is An 8Ball Usage: .8ball [YesOrNo Question] \n Cowsay: Moooooo Usage: .cowsay [text] \n Insult: Instults a given person (Still under develeopment) Usage: .insult [name] Bomb: Sends A Bomb Usage: .bomb \n Clapify: Clapifies That Text! Usage: .clapify [text] \n Urban: Looks Up A String On Urban Dictionary Usage: .Urban [string] \n Fireworks: Sends Some Cool Fireworks Usage: .fireworks \n Forcecrush: Force Crush! Usage: .forcecrush \n Fusrodah: Fus.....RO DAH!!! Usage: Call To The Ancients With .fusrodah \n Lovecalc: Calculates The Chances Of Love Between Any Two Objects! Usage: .lovecalc [object1] [object2] \n Magicify: Turns Your Message Into An Ugly Embed! Usage: .magicify [text] \n Meme: Sends Some Dank Memes! Usage: .meme \n O: Swotchos Oll Vowols On O Strong To 'o' Usogo: .o [toxt] \n Reverse: Reverses A String Usage: .reverse [words] \n Rickroll: .... Usage: .rickroll \n Rr1: Russian Roulette Bud! Usage: .rr1 \n Say: Makes The Bot Say What You Say. Usage: .say [words] \n Sigh: Sigh :frowning: Usage: .sigh \n Ss: Compete With Other Users To Set The Status Of My Bot! Usage: .ss \n Tts: Text To Speech. Usage: .tts [text] WARNING THIS CAN BE ANNOYING DISABLE TTS IF SOMEONE ABUSES IT, AND REPORT THEM WITH .BUGREPORT \n```");
        message.author.send("```js\n NSFW:\n Ass: Shows Some Ass ;) NSFW ONLY Usage: .ass\n Bond: Bondage NSFW ONLY Usage: .bond\n Hentai: Looks Up Some Hentai Babes For You Weebs Out There Usage: .hentai\n Nsfw: Sends Some Standard NSFW Usage: .nsfw\n```");
        message.author.send("```js\n Moderation: Ban: Bans A User MOD ONLY Usage: .ban [@user] [Reason]\n Kick: Kicks A Member. Usage: .kick @member [reason]\n Purge: Deletes Messages MOD ONLY Usage: .purge [number<100]\n Report: Reports A Member Usage: .report [@member] [reason]\n Role: Ignore This Command It Is In Maintenance \n```");
        message.author.send("```js\n Utilities: \n Uptime: Shows Uptime Usage: .uptime \n Guildlist: Shows a list of guilds the bot is in. Usage: .guildlist \n Userinfo: displays info on a user Usage: .userinfo [@user] \n Botinfo: Displays Info On The Bot Usage: .botinfo \n Bugreport: Reports A Bug Directly To The Dev Of The Bot (A.K.A. ME) Usage: .bugreport [Bug] \n Calc: Calculates The Value Of An Expression Usage: .calc [expression E.g. 1+1] \n Help: Ehm, Idk What To Tell You. Usage: How Are You Even Here? \n Haste: Adds A String To Hastebin Usage: .haste [String (A.K.A Words)] \nInv: Shows Invite Links For My Bot, And The Support Server. Usage: .inv \n Line: Draws The LINE! Usage: .line \nPing: Pings Places All Around The World Usage: .ping \n Schedule: Schedules A Message. Usage: .schedule [Part 1 Of Message] [Part 2 Of Message] [time] \n Serverinfo: Displays Info On The Server Usage: .serverinfo \n Timer: Sets A Timer. Usage: .timer [time In Ms, S, M, Or H.] \nTranslate: Translates Supplied Text. Usage: .translate [language To Translate TO] [text To Translate] \n```");
        message.author.send("```js\n Music: \n Np: Shows What Is Now Playing Usage: .np \n Pause: Pauses Music Usage: .pause \n Play: Plays Music. Usage: .play [song Name], Then Select From List By Typing The Corresponding Number (e.g. For Song 2 Type 2) \n Queue: Shows Music Queue \n Resume: Resumes A Paused Song. Usage: .resume \n Skip: Skips A Song Usage: .skip \n Stop: Stops Music From Playing Usage: .stop \n Vol: Volume Usage: .vol [number] \n```")
        message.channel.send(`js\n Help was sent to ${message.author.tag}`);
    }

    if (command === "Lyons2") {
        const oldMessage = args.join(" ");
        message.delete().catch(O_o => {});
        const a = oldMessage.replace(/y/g, "ab");
        const b = a.replace(/x/g, "za");
        const c = b.replace(/w/g, "yz");
        const d = c.replace(/v/g, "xy");
        const e = d.replace(/u/g, "wx");
        const f = e.replace(/t/g, "vw");
        const g = f.replace(/s/g, "uv");
        const h = g.replace(/r/g, "tu");
        const i = h.replace(/q/g, "st");
        const j = i.replace(/p/g, "rs");
        const k = j.replace(/o/g, "qr");
        const l = k.replace(/n/g, "pq");
        const m = l.replace(/m/g, "op");
        const n = m.replace(/l/g, "no");
        const o = n.replace(/k/g, "mn");
        const p = o.replace(/j/g, "lm");
        const q = p.replace(/i/g, "kl");
        const r = q.replace(/h/g, "jk");
        const s = r.replace(/g/g, "ij");
        const t = s.replace(/f/g, "hi");
        const u = t.replace(/e/g, "gh");
        const v = u.replace(/d/g, "fg");
        const w = v.replace(/c/g, "ef");
        const x = w.replace(/b/g, "de");
        const y = x.replace(/a/g, "cd");
        const z = y.replace(/z/g, "bc");
        message.channel.send(z);
        message.channel.send("this is the lyonsCipher V2.0");
    }
    if (command === "cowsay") {
        const moo = args.join(' ');
        message.channel.send("```" + "________________________________\n " + "<" + moo + ">\n " + "--------------------------------\n" + "        \\    ^__^ \n " + "        \\   (oo)\\_______\n " + "            (__)\\       )\\/\\\n " + "                ||----w ||\n " + "                ||     |\n " + "```");
    }
    if (command === "insult") {
        const a = args.join
        const answers = [
            "a bastard",
            "wicked",
            "so fat, it took Thanos 2 snaps to kill her",
            "so ugly, even Dr. Frankenstein turned you down",
            "such a weeb that i fucked ur mum so hard her pussy turned into a dick and  then i fuked ur dads asshole so hard it turned into a pussy then they cucked me and fuked each other whilst i was rubbing my dick until i cummed into ur mums dick who used that semen as lube but she also cummed into ur dads pussy. 6 months later ur little sister came out whomst ur parents groomed until she hit puberty and they continued to fuk her everyday until she gave birth to you",
            "not worth even the laziest of insults",
            "not good",
            "noob Sauce",
            "so fat the flash tried to run around you but he died from age before he could get halfway",
            "a cocain addicted cow",
            "depresses cuz ur mom gay lol",
            "mmmmmmmmmmmmmmmmmmmmmmmmmmmGay"
        ]
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        if (!args) {
            message.channel.send("You are " + randomAnswer + ".")
            return
        } else {
            message.channel.send(args + " is" + randomAnswer + ".")
        }
    }
    if (command === "8ball") {
        const answers = [
            "Yes",
            "Not a Chance!",
            "No",
            "Maybe",
            "Could Be!",
            "Yes, but only on Tuesdays",
            "Ummmm I forgot?",
        ]
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(randomAnswer);
    }
    ////NSFW////
    if (command === "ass") {
        if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");

        var subreddits = [
            'facedownassup',
            'assinthong',
            'asstastic'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor("4k", client.user.avatarURL)
                    .setFooter("xD")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }
    if (command === "bond") {
        if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");

        var subreddits = [
            'hentaibondage',
            'Bondage',
            'Dominated'


        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor("4k", client.user.avatarURL)
                    .setFooter("xD")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }
    if (command === "hentai") {
        if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");

        var subreddits = [
            'HENTAI_GIF',
            'hentaibondage ',
            'hentaifemdom'


        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor("4k", client.user.avatarURL)
                    .setFooter("xD")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }
    if (command === "nsfw") {
        if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");

        var subreddits = [
            'NSFW_Wallpapers',
            'SexyWallpapers',
            'HighResNSFW',
            'nsfw_hd',
            'UHDnsfw'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor("4k", client.user.avatarURL)
                    .setFooter("xD")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }
    ////NSFW////
    ////Moderation////
    if (command === "ban") {
        if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("It appears you don't have permission to do this.")
        if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("It appears I don't have permission to do this.")

        let user1 = message.mentions.users.first();
        let reason1 = message.content.split(" ").slice(2).join(" ");
        let modlog1 = client.channels.find("name", "incidents" || "Incidents");

        if (!modlog1) return message.reply("I've detected that this server doesn't have a mod-log channel.");
        if (message.mentions.users.size < 1) return message.reply("You must mention someone in order to ban them!");
        if (!reason1) return message.reply("Enter a reason for ban.");
        if (!message.guild.member(user1).kickable) return message.reply("I can't ban the owner!");
        message.guild.member(user1).ban(reason1);
        modlog1.channel.send(`${user1} Was kicked by ${message.author}`)
    }
    if (command === "bugreport") {
        try {
            function clean(text) {
                if (typeof(text) === 'string')
                    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
                else
                    return text;
            }
            const bug = args.join(" ")
            if (!bug) return message.channel.send('Please specify a bug!')
            const content = clean(`**${message.author.username}**#${message.author.discriminator} (${message.author.id}) reported a bug:\n${bug}\nServer: **${message.guild.name}**\nID: **${message.guild.id}**`);
            const id = '456010007884988427';
            new Promise((resolve, reject) => {
                superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
                    .set('Authorization', `Bot ${client.token}`).send({
                        content
                    })
                    .end((err, res) => {
                        if (err) {
                            reject(err);
                            message.reply('There was an error while sending your bug report to Daebot Support. Please try again later.');
                        } else {
                            resolve(res);
                            message.channel.send(`:white_check_mark: **${message.author.username}**, your bug report has successfully been submitted to Daebot Support for review. Thank you!.`);
                        }
                    });
            });
        } catch (err) {
            console.log(err)
        }
    }
    if (command === "botinfo") {
        let bicon = client.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("Bot Information")
            .setColor("#15f153")
            .setThumbnail(bicon)
            .addField("users", `with ${client.guilds.MemberCount}users`)
            .addField("channels", `in ${client.channels.size} channels`)
            .addField("Servers", `in ${client.guilds.size} servers`)
            .addField("Bot Name", client.user.username)
            .addField("Created On", client.user.createdAt);

        return message.channel.send(botembed);
    }
    if (command === "mute") {
        let reason = args.slice(1).join(' ');
        let member = message.mentions.members.first();
        let modlog = message.guild.channels.find('name', 'mod-log');
        let muteRole = message.guild.roles.find('name', 'Muted');
        if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
        if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
        if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
        if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .setDescription(`**Action:** Un/mute\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions.').catch(console.error);

        if (member.roles.has(muteRole.id)) {
            member.removeRole(muteRole).then(() => {
                    client.channels.get(modlog.id).send({
                        embed
                    }).catch(console.error);
                })
                .catch(e => console.error("Cannot remove muted role: " + e));
        } else {
            member.addRole(muteRole).then(() => {
                    client.channels.get(modlog.id).send({
                        embed
                    }).catch(console.error);
                })
                .catch(e => console.error("Cannot add muted role: " + e));
        }

    };
    if (command === "unmute") {
        let guild = message.guild;
        let args = message.content.split(' ').slice(1);
        let argresult = args.join(' ');
        let reason = args;
        message.delete(1000);
        if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES')) {
            return message.reply(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`').catch(e => logger.error(e));
        }
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
            return message.reply(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`').catch(e => logger.error(e));
        }
        let user = message.mentions.users.first();
        let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
        if (message.mentions.users.size < 1) {
            return message.reply('You need to mention someone to unmute him!.');
        }
        message.guild.member(user).removeRole(muteRole).then(() => {
            message.channel.send(`You've succesfully unmuted ${user}`);
        });
    };

    ////Moderation////
    ///Fun///
    if (command === "bomb") {
        const answers = [
            "https://giphy.com/gifs/XDLJpjzyw76Sc",
            "https://giphy.com/gifs/cartoon-explosion-nn2xFuRUFqXNS",
            "https://media.giphy.com/media/Qw4X3FkHjXDWr9p3bIk/giphy.gif",
            "https://media3.giphy.com/media/3o85xoHuw9GowpnyUg/giphy.gif",
            "https://i.gifer.com/298c.gif",
            "https://thumbs.gfycat.com/LoathsomeReliableChicken-size_restricted.gif",
            "https://media0.giphy.com/media/l3vR1tookIhM8nZJu/giphy.gif",
            "http://2.bp.blogspot.com/-xCrGhX8sJRQ/VAJPyz0ct3I/AAAAAAAAD7I/rWfaP-o7SUQ/s1600/time%2Bbomb.gif",
            "https://cdn.dribbble.com/users/149082/screenshots/1041104/bomb-explosion.gif",
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/21f78d23126231.5604767a04f53.gif",
            "https://thumbs.gfycat.com/CheapSeriousAfricanbushviper-max-1mb.gif",
            "https://i.gifer.com/9pHv.gif",
            "https://media.giphy.com/media/l0IxYWDltdHEqujnO/giphy.gif",
            "http://www.zombietime.com/mohammed_image_archive/derivative_works/tb.gif",
            "https://media3.giphy.com/media/3oEjHKPPlmQlGXfeLK/giphy.gif",
            "https://i.gifer.com/DzW.gif",
            "https://media.giphy.com/media/QAHeA9pX29lLi/giphy.gif",
            "https://media.giphy.com/media/IlNHcvyO6JCYE/giphy.gif",
            "https://uploads.disquscdn.com/images/230b7c1cf5db1cc3a67729fd545ecec4be5401245f172e3c6a0eefdd67e2bd22.gif",

        ]
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(randomAnswer);

    }
    if (command === "calc") {
        console.log(`[${message.author.tag}] [${message.author.id}] did command [${command}.js]`)
        let input = args.join(" ");
        if (!input) {
            message.reply('__You must provide a equation to be solved on the calculator!__');
            return;
        }

        const question = args.join(" ");

        let answer;
        try {
            answer = math.eval(question);
        } catch (err) {
            return message.reply(`**Invalid math equation:** ${err}`);
        }

        const embed = new Discord.RichEmbed()
            .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/31QYTepQomL.png")
            .setColor('RANDOM')
            .addField("**Question:**", question, true)
            .addField("**Answer:**", answer)

        message.channel.send({
            embed
        })
    };
    const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

    if (command === "clapify") {
        if (args.length < 1) return message.channel.send("**I need some text to clapify.** `ium clap <sentence>`")
        message.channel.send(args.map(randomizeCase).join(':clap:'));
    }
    if (command === "urban") {
        if (!args[0]) return message.channel.send(`***Please specify some text!***`);
        let res = await urban(args.join(' ')).catch(e => {
            return message.channel.send('***Sorry, that word was not found!***');
        });

        const embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(res.word)
            .setURL(res.urbanURL)
            .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
            .addField('Author', res.author, true)
            .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)
        if (res.tags.length > 0 && res.tags.join(' ').length < 1024) {
            embed.addField('Tags', res.tags.join(', '), true)
        }


        message.channel.send(embed);

    }
    if (command === "fireworks") {
        const magic = [
            "https://media.giphy.com/media/IjmMzurYulKEw/giphy.gif",
            "https://media1.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif",
            "http://bestanimations.com/Holidays/Fireworks/fireworks/gold-fireworks-animated-gif.gif",
            "https://media.giphy.com/media/peAFQfg7Ol6IE/giphy.gif",
            "https://media.giphy.com/media/w5f56AhubQo8w/giphy.gif",
            "http://bestanimations.com/Holidays/Fireworks/fireworks/ba-awesome-colorful-fireworks-animated-gif-image-s.gif",
            "http://bestanimations.com/Holidays/Fireworks/fireworks/ba-blue-red-fireworks-colorful-pretty-gif-pic.gif",
        ]
        const randomAnswer = magic[Math.floor(Math.random() * magic.length)];
        message.channel.send(randomAnswer);
    }
    if (command === "fusrodah") {
        const answers = [
            "https://media.giphy.com/media/fJcYJWdPPPNQI/giphy.gif",
            "https://i.imgur.com/bMBpsmx.gif",
            "http://giant.gfycat.com/HospitableConcreteAtlanticridleyturtle.gif",
            "http://i.imgur.com/IuKyJ.gif",
            "http://www.gifbin.com/bin/052011/1305030514_cooling-tower-implosion.webm",
            "https://i.kinja-img.com/gawker-media/image/upload/s--1nnLdy0K--/c_scale,f_auto,fl_progressive,q_80,w_800/18s8qh8utjx9qgif.gif",
        ]
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(randomAnswer);
    }
    if (command === "haste") {
        hastebin(args.join(' '), "js").then(r => {
            var hastLink = r
            const hastEmb = new Discord.RichEmbed()
                .setColor(0xFFF000)

                .setURL(hastLink)
                .addField('Link: ', `${hastLink}`)
            message.channel.send({
                embed: hastEmb
            })
        }).catch(console.error);
    }
    if (command === "kick") {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");



        let kickChannel = message.guild.channels.find(`name`, "incidents");
        if (!kickChannel) return message.channel.send("Can't find incidents channel.");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send("kicked");

        return;
    }

    if (command === "line") {

        message.channel.send("`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");

    }
    if (command === "lovecalc") {
        const mss = args.join(" ");
        const answers = [
            "10%, no way man",
            "25% This could work out, just be careful",
            "10%, no way man",
            "25% This could work out, just be careful",
            "10%, no way man",
            "25% This could work out, just be careful",
            "10%, no way man",
            "25% This could work out, just be careful",
            "10%, no way man",
            "25% This could work out, just be careful",
            "50% I wish you luck, this is both good and bad",
            "50% I wish you luck, this is both good and bad",
            "50% I wish you luck, this is both good and bad",
            "50% I wish you luck, this is both good and bad",
            "25% This could work out, just be careful",
            "50% I wish you luck, this is both good and bad",
            "50% I wish you luck, this is both good and bad",
            "50% I wish you luck, this is both good and bad",
            "50% I wish you luck, this is both good and bad",
            "90.09099% Great Match!! Go For it!!!",
            "75% This could work! Go For it!",
            "75% This could work! Go For it!",
            "75% This could work! Go For it!",
            "75% This could work! Go For it!",
            "75% This could work! Go For it!",
            "75% This could work! Go For it!",
            "200% This is the best match ive ever seen!! Wow!!!",
            "10%, no way man",
            "25% This could work out, just be careful",
            "10%, no way man",
            "25% This could work out, just be careful",
        ]
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send({
            embed: {
                color: 10834749,
                fields: [{
                    name: "love",
                    value: mss + randomAnswer
                }, ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© DeathBot"
                }
            }
        });


    }
    if (command === "ntl") {
        const oldMessage = args.join(" ");
        message.delete().catch(O_o => {});
        const a = oldMessage.replace(/1/g, "a");
        const b = a.replace(/2/g, "b")
        const c = b.replace(/3/g, "c")
        const e = c.replace(/4/g, "d")
        const f = e.replace(/5/g, "e")
        const g = f.replace(/6/g, "f")
        const h = g.replace(/7/g, "g")
        const i = h.replace(/8/g, "h")
        const j = i.replace(/9/g, "i")
        const k = j.replace(/10/g, "j")
        const l = k.replace(/11/g, "k")
        const m = l.replace(/12/g, "l")
        const n = m.replace(/13/g, "m")
        const o = n.replace(/14/g, "n")
        const p = o.replace(/15/g, "o")
        const q = p.replace(/16/g, "p")
        const r = q.replace(/17/g, "q")
        const s = r.replace(/18/g, "r")
        const t = s.replace(/19/g, "s")
        const u = t.replace(/20/g, "t")
        const v = u.replace(/21/g, "u")
        const w = v.replace(/22/g, "v")
        const x = w.replace(/23/g, "w")
        const z = x.replace(/24/g, "x")
        const aa = z.replace(/25/g, "y")
        const bb = aa.replace(/26/g, "z")
        const cc = bb.replace(/27/g, "a")
        const dd = cc.replace(/28/g, "b")
        const ee = dd.replace(/29/g, "c")
        const ff = ee.replace(/30/g, "d")
        const gg = ff.replace(/31/g, "e")
        const hh = gg.replace(/32/g, "f")
        const ii = hh.replace(/33/g, "g")
        const jj = ii.replace(/34/g, "h")
        const kk = jj.replace(/35/g, "i")
        const ll = kk.replace(/36/g, "j")
        const mm = kk.replace(/37/g, "k")
        const nn = mm.replace(/38/g, "l")
        const oo = nn.replace(/39/g, "m")
        const pp = oo.replace(/40/g, "n")
        const qq = pp.replace(/41/g, "o")
        const rr = qq.replace(/42/g, "p")
        const ss = rr.replace(/43/g, "q")
        const tt = ss.replace(/44/g, "r")
        const uu = tt.replace(/45/g, "s")
        const vv = uu.replace(/46/g, "t")
        const ww = vv.replace(/47/g, "u")
        const xx = ww.replace(/48/g, "v")
        message.channel.send(xx);
    }
    if (command === "lyon1") {
        const oldMessage = args.join(" ");
        message.delete().catch(O_o => {});
        const a = oldMessage.replace(/z/g, "ab");
        const b = a.replace(/y/g, "za");
        const c = b.replace(/x/g, "yz");
        const d = c.replace(/w/g, "xy");
        const e = d.replace(/v/g, "wx");
        const f = e.replace(/u/g, "vw");
        const g = f.replace(/t/g, "uv");
        const h = g.replace(/s/g, "tu");
        const i = h.replace(/r/g, "st");
        const j = i.replace(/q/g, "rs");
        const k = j.replace(/p/g, "qr");
        const l = k.replace(/o/g, "pq");
        const m = l.replace(/n/g, "op");
        const n = m.replace(/m/g, "no");
        const o = n.replace(/l/g, "mn");
        const p = o.replace(/k/g, "lm");
        const q = p.replace(/j/g, "kl");
        const r = q.replace(/i/g, "jk");
        const s = r.replace(/h/g, "ij");
        const t = s.replace(/g/g, "hi");
        const u = t.replace(/f/g, "gh");
        const v = u.replace(/e/g, "fg");
        const w = v.replace(/d/g, "ef");
        const x = w.replace(/c/g, "de");
        const y = x.replace(/b/g, "cd");
        const z = y.replace(/a/g, "bc");
        message.channel.send(z);
        message.channel.send("this is the lyonsCipher");
    }

    if (command === "magicify") {
        const annoyingmsg = args.join(" ");
        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Embedded message!")
            .setColor("#15f153")
            .addField("Message:", annoyingmsg)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
        message.delete().catch(O_o => {});
        message.channel.send(reportEmbed);
    }

    if (command === "meme") {

        meme(function(data) {
            const embed = new Discord.RichEmbed()
                .setTitle(data.title[0])
                .setColor("RANDOM")
                .setImage(data.url[0])
            message.channel.send({
                embed
            });
        })
    };

    if (command === "morseslyon") {
        message.delete().catch(O_o => {});
        const oldMessage = args.join(" ");
        const a = oldMessage.replace(/z/g, "//////");
        const b = a.replace(/y/g, "/////.....");
        const c = b.replace(/x/g, "/////....");
        const d = c.replace(/w/g, "/////...");
        const e = d.replace(/v/g, "/////..");
        const f = e.replace(/u/g, "/////.");
        const g = f.replace(/t/g, "////.....");
        const h = g.replace(/s/g, "////....");
        const i = h.replace(/r/g, "////...");
        const j = i.replace(/q/g, "////..");
        const k = j.replace(/p/g, "////.");
        const l = k.replace(/o/g, "///.....");
        const m = l.replace(/n/g, "///....");
        const n = m.replace(/m/g, "///...");
        const o = n.replace(/l/g, "///..");
        const p = o.replace(/k/g, "///.");
        const q = p.replace(/j/g, "//.....");
        const r = q.replace(/i/g, "//....");
        const s = r.replace(/h/g, "//...");
        const t = s.replace(/g/g, "//..");
        const u = t.replace(/f/g, "//.");
        const v = u.replace(/e/g, "/.....");
        const w = v.replace(/d/g, "/....");
        const x = w.replace(/c/g, "/...");
        const y = x.replace(/b/g, "/..");
        const z = y.replace(/a/g, "/.");
        const zero = z.replace(/0/g, ".");
        const one = zero.replace(/1/g, "./");
        const two = one.replace(/2/g, ".//");
        const three = two.replace(/3/g, ".///");
        const four = three.replace(/4/g, ".////");
        const five = four.replace(/5/g, "../");
        const six = five.replace(/6/g, "..//");
        const seven = six.replace(/7/g, "..///");
        const eight = seven.replace(/8/g, "..////");
        const nine = eight.replace(/9/g, "../////");
        const space = nine.replace(/ /g, "X");
        message.channel.send(space);
    }
    if (command === "timer") {
        let Timer = args[0];

        if (!args[0]) {
            return message.channel.send("Please enter a period of time, with either `s,m or h` at the end!");
        }

        if (args[0] <= 0) {
            return message.channel.send("Please enter a period of time, with either `s,m or h` at the end!");
        }

        message.channel.send(":white_check_mark: Timer has been set for: " + `${ms(ms(Timer), {long: true})}`)

        setTimeout(function() {
            message.channel.send(`Timer has ended, it lasted: ${ms(ms(Timer), {long: true})}` + message.author.toString())

        }, ms(Timer));
    }
    if (command === "translate") {
        const Langs = ['afrikaans', 'albanian', 'amharic', 'arabic', 'armenian', 'azerbaijani', 'bangla', 'basque', 'belarusian', 'bengali', 'bosnian', 'bulgarian', 'burmese', 'catalan', 'cebuano', 'chichewa', 'chinese simplified', 'chinese traditional', 'corsican', 'croatian', 'czech', 'danish', 'dutch', 'english', 'esperanto', 'estonian', 'filipino', 'finnish', 'french', 'frisian', 'galician', 'georgian', 'german', 'greek', 'gujarati', 'haitian creole', 'hausa', 'hawaiian', 'hebrew', 'hindi', 'hmong', 'hungarian', 'icelandic', 'igbo', 'indonesian', 'irish', 'italian', 'japanese', 'javanese', 'kannada', 'kazakh', 'khmer', 'korean', 'kurdish (kurmanji)', 'kyrgyz', 'lao', 'latin', 'latvian', 'lithuanian', 'luxembourgish', 'macedonian', 'malagasy', 'malay', 'malayalam', 'maltese', 'maori', 'marathi', 'mongolian', 'myanmar (burmese)', 'nepali', 'norwegian', 'nyanja', 'pashto', 'persian', 'polish', 'portugese', 'punjabi', 'romanian', 'russian', 'samoan', 'scottish gaelic', 'serbian', 'sesotho', 'shona', 'sindhi', 'sinhala', 'slovak', 'slovenian', 'somali', 'spanish', 'sundanese', 'swahili', 'swedish', 'tajik', 'tamil', 'telugu', 'thai', 'turkish', 'ukrainian', 'urdu', 'uzbek', 'vietnamese', 'welsh', 'xhosa', 'yiddish', 'yoruba', 'zulu'];
        if (args[0] === undefined) {

            const embed = new Discord.RichEmbed()
                .setColor("FFFFFF")
                .setDescription("**Provide a language and some text for Daebot to translate.**\nUsage: `PREFIXX translate <language> <text>`");

            return message.channel.send(embed);

        } else {

            if (args[1] === undefined) {

                return message.channel.send('**Please give me something to translate.** `PREFIX translate <language> <text>`');

            } else {

                let transArg = args[0].toLowerCase();

                args = args.join(' ').slice(prefix.length);
                let translation;

                if (!Langs.includes(transArg)) return message.channel.send(`**Language not found.**`);
                args = args.slice(transArg.length);

                translate(args, {
                    to: transArg
                }).then(res => {

                    const embed = new Discord.RichEmbed()
                        .setDescription(res.text)
                        .setFooter(`english -> ${transArg}`)
                        .setColor(`RANDOM`);
                    return message.channel.send(embed);

                });

            }

        }

    }

    if (command === "tts") {
        module.exports.run = (client, message, args) => {
            const ra = args.join(" ");
            message.channel.send(ra, {
                tts: true
            });

        };
    }

    if (command === "purge") {
        const user = message.mentions.users.first();
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Sorry, you don\'t have permission to delete or purge messages!')
            .then(msg => msg.delete({
                timeout: 100000
            }));
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.channel.send('Specify an amount of messages to delete or purge!')
            .then(msg => msg.delete({
                timeout: 100000
            }));
        if (!amount && !user) return message.channel.send('Specify a user and amount, or just an amount, of messages to delete or purge!')
            .then(msg => msg.delete({
                timeout: 100000
            }));
        message.channel.fetchMessages({
                limit: amount,
            })
            .then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy)
                        .array()
                        .slice(0, amount);
                }
                message.channel.bulkDelete(messages)
                message.channel.send(`${amount} messages removed Permanently by <@${message.author.id}>`)
                    .catch(error => console.log(error.stack));
            });
    }
    if (command === "report") {
        try {
            function clean(text) {
                if (typeof(text) === 'string')
                    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
                else
                    return text;
            }
            const bug = args.join(" ")
            if (!bug) return message.channel.send('Please specify a bug!')
            const content = clean(`**${message.author.username}**#${message.author.discriminator} (${message.author.id}) reported a bug:\n${bug}\nServer: **${message.guild.name}**\nID: **${message.guild.id}**`);
            const id = 'channel_id';
            new Promise((resolve, reject) => {
                superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
                    .set('Authorization', `Bot ${client.token}`).send({
                        content
                    })
                    .end((err, res) => {
                        if (err) {
                            reject(err);
                            message.reply('There was an error while sending your bug report to Frogbot Support. Please try again later.');
                        } else {
                            resolve(res);
                            message.channel.send(`:white_check_mark: **${message.author.username}**, your bug report has successfully been submitted to Frogbot Support for review. Thank you!.`);
                        }
                    });
            });
        } catch (err) {
            console.log(err)
        }
    }
    if (command === "reverse") {
        if (args.length < 1) {
            throw 'You must input text to be reversed!';
        }
        message.channel.send(args.join(' ').split('').reverse().join(''));
    };
    if (command === "rickroll") {
        const answers = [
            "https://www.youtube.com/watch?v=bi5pOo_Z2GM",
            "https://www.youtube.com/watch?v=Uj1ykZWtPYI",
            "https://www.youtube.com/watch?v=xfr64zoBTAQ",
            "https://www.youtube.com/watch?v=V-_O7nl0Ii0",
            "https://www.youtube.com/watch?v=EE-xtCF3T94&list=PLnJhY7qfCqzMI5kO8skuRjpgrBujjjlz5&index=1",
        ]
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(randomAnswer);
    }
    if (command === "role") {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have permissions.")
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!rMember) return message.reply("Please provide a user name")
        let role = args.join(" ").slice(22);

        if (!role) return message.reply("Please provide a role name.");
        let aRole = message.guild.roles.find(`name`, role);
        if (!aRole) return message.reply(`I can't find the role.`);

        if (rMember.roles.has(aRole.id)) return message.reply("The user already have this role!");
        await (rMember.addRole(aRole.id))
    }
    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
    }
    if (command === "schedulemsg") {
        jj = args[0]
        ii = args[1]
        let Timer = args[2];

        if (!args[2]) {
            return message.channel.send("Please enter a period of time, with either `s,m or h` at the end!");
        }

        if (args[2] <= 0) {
            return message.channel.send("Please enter a period of time, with either `s,m or h` at the end!");
        }

        message.channel.send(":white_check_mark: Timer has been set for: " + `${ms(ms(Timer), {long: true})}`)

        setTimeout(function() {
            message.channel.send(`Timer has ended, it lasted: ${ms(ms(Timer), {long: true})} Message will now be sent` + message.author.toString());
            message.channel.send(jj + " " + ii)

        }, ms(Timer));
    }
    if (command === "Serverinfo") {
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
            .setDescription("Server Information")
            .setColor("#15f153")
            .setThumbnail(sicon)
            .addField("Server Name", message.guild.name)
            .addField("Created On", message.guild.createdAt)
            .addField("You Joined", message.member.joinedAt)
            .addField("Total Members", message.guild.memberCount);

        return message.channel.send(serverembed);
    }

    if (command === "asigh") {
        const ascii = `
\`\`\`
  _______   _________    _________   ,        ,
 /              |       /            |        |
|               |      |             |        |
|               |      |             |        |
 \\_____,        |      |  _______,   |________|
        \\       |      |         |   |        |
         |      |      |         |   |        |
         |      |      |         |   |        |
  ______/   ____|____   \\________|   |        |
\u200b
\`\`\`
`;


        message.channel.send(ascii);
    };
    if (command === "ss") {
        const mss = args.join(" ");
        client.user.setActivity(mss);
        if (message.author.id === "347885325940424714") {
            message.channel.send("Yes, my ***True Liege***");
            return
        } else {
            message.channel.send("Yes, my ~~subordinate~~ liege.");
        }
    }
    ///Fun///
    ///misc///
    if (command === "inv") {
        return message.reply({
            embed: {
                color: 9198700,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "invite",
                description: "Invites to the bot and the server.",
                fields: [{
                        name: "To invite me to another server:",
                        value: "https://discordapp.com/api/oauth2/authorize?client_id=447588362350755840&permissions=8&scope=bot"
                    },
                    {
                        name: "And to join my creators host server:",
                        value: "https://discord.gg/f7Ntjek  Have fun! Everyone there likes to work on cryptology!"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "©DaeBot"
                }
            }
        });
    }
    ///misc
    ////////////////////////////////////////////////////MUSIC//////////////////////////////////////////////////////////////////////
    if (!message.content.startsWith(prefix)) return;
    var searchString = args.slice(1).join(' ');
    var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);

    if (command === "play") {
        var voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        var permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            var playlist = await youtube.getPlaylist(url);
            var videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var index = 0;
                    message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send('No or invalid value entered, cancelling video selection.');
                    }
                    var videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    }
    if (command === "skip") {
        if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
        if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
        serverQueue.connection.dispatcher.end('Skip command has been used!');
        return undefined;
    }
    if (command === "stop") {
        if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
        if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop command has been used!');
        return undefined;
    }
    if (command === "vol") {
        if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 10);
        return message.channel.send(`I set the volume to: **${args[0]}**`);
    }
    if (command === "np") {
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    }
    if (command === "queue") {
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
    }
    if (command === "pause") {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send('Well, I guess paused the music for you!');
        }
        return message.channel.send('There is nothing playing. Like. Anywhere');
    }
    if (command === "resume") {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send('I have resumed the music for you!');
        }
        return message.channel.send('There is nothing playing.');
        return undefined;
    }
    async function handleVideo(video, message, voiceChannel, playlist = false) {
        var serverQueue = queue.get(message.guild.id);
        console.log(video);
        var song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if (!serverQueue) {
            var queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(`Sorry I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return undefined;
            else return message.channel.send(`Radical! **${song.title}** has been added to the queue!`);
        }
        return undefined;
    }

    function play(guild, song) {
        var serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', reason => {
                message.channel.send('``The queue of song is end.``');
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(reason);
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);

        serverQueue.textChannel.send(`Started playing: **${song.title}**`);
    }
    ////////////////////////////////////////////////////////////////MUSIC/////////////////////////////////////////////////////
}
});
client.login(process.env.BOT_TOKEN);
