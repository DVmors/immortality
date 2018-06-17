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
    // Send the message, mentioning the member
    channel.send(` ${member}, Has joined the Fray... Poor Person`);
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const prefix = config.prefix
    
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
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        const randomNamaste = namaste[Math.floor(Math.random() * answers.length)];
        m.edit(`Pong! It took ${m.createdTimestamp - message.createdTimestamp}ms to find ***${randomNamaste}*** in ***${randomAnswer}*** after ${Math.round(client.ping)} counts of felony!!`)

    };
	 if (command === "uptime") {
        message.edit("The uptime is **" + moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]') + "**")
    }
  if (command === "userinfo") {
        let user = message.mentions.users.first()
        if (!user) { return message.edit(":x: Unknown user!") }
        message.edit(("", { embed: new Discord.RichEmbed().setTitle("**Userinfo**").setColor("#00D4FF").setThumbnail(user.avatarURL).setDescription("Username - **" + user.username + "**\nDiscrim - **" + user.discriminator + "**\nID - **" + user.id + "**\nGame - **" + user.presence.game.name + "**\nStatus - **" + user.presence.status + "**\n").setFooter("Information sourced from Discord") }));
    }
  if (command === "guildlist") {
        message.edit(client.guilds.forEach(g => { message.edit(g.name) }))
    }
    if (command === "help") {
        message.author.send("```js\n Economy: \n Add: Ignore This Command It Is In Maintenance \n Addb: Ignore This Command It Is In Maintenance \n Addc: Ignore This Command It Is In Maintenance \n Bal: Ignore This Command It Is In Maintenance \n Balb: Ignore This Command It Is In Maintenance \n Buy: Ignore This Command It Is In Maintenance \n Daily: Ignore This Command It Is In Maintenance \n Gamble: Ignore This Command It Is In Maintenance \n Gamblec: Ignore This Command It Is In Maintenance \n Robb: Ignore This Command It Is In Maintenance \n```");
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
	if(command === "cowsay"){
		const moo = args.join(' ');
	message.channel.send("```"+ "________________________________\n " +"<"+ moo + ">\n "+"--------------------------------\n"+"        \\    ^__^ \n "+"        \\   (oo)\\_______\n "+"            (__)\\       )\\/\\\n "+"                ||----w ||\n "+"                ||     |\n "+"```");
	}
if(command === "insult"){
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
if(!args){
message.channel.send("You are "+randomAnswer+".")
return}else{
message.channel.send(args +" is"+randomAnswer+".")
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
            .addField("users", `with ${client.users.size}users`)
            .addField("channels", `in ${client.channels.size} channels`)
            .addField("Servers", `in ${client.guilds.size} servers`)
            .addField("Bot Name", client.user.username)
            .addField("Created On", client.user.createdAt);

        return message.channel.send(botembed);
    }
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
if(command === "ntl"){
	 const oldMessage = args.join(" ");
        message.delete().catch(O_o => {});
const a = oldMessage.replace(/1/g, "a");
	const b = a.replace(/2/g, "b")
	const c = b.replace(/3/g, "c")
	const e  =c.replace(/4/g, "d")
	const f = e.replace(/5/g, "e")
	const g = f.replace(/6/g, "f")
	const h = g.replace(/7/g, "g")
	const i = h.replace(/8/g, "h")
	const j= i.replace(/9/g, "i")
	const k = j.replace(/10/g, "j")
	const l= k.replace(/11/g, "k")
	const m= l.replace(/12/g, "l")
	const n= m.replace(/13/g, "m")
	const o = n.replace(/14/g, "n")
	const p= o.replace(/15/g, "o")
	const q= p.replace(/16/g, "p")
	const r= q.replace(/17/g, "q")
	const s= r.replace(/18/g, "r")
	const t= s.replace(/19/g, "s")
	const u= t.replace(/20/g, "t")
	const v= u.replace(/21/g, "u")
	const w= v.replace(/22/g, "v")
	const x= w.replace(/23/g, "w")
	const z= x.replace(/24/g, "x")
	const aa= z.replace(/25/g, "y")
	const bb= aa.replace(/26/g, "z")
	const cc= bb.replace(/27/g, "a")
	const dd= cc.replace(/28/g, "b")
	const ee= dd.replace(/29/g, "c")
	const ff= ee.replace(/30/g, "d")
	const gg= ff.replace(/31/g, "e")
	const hh= gg.replace(/32/g, "f")
	const ii= hh.replace(/33/g, "g")
	const jj= ii.replace(/34/g, "h")
	const kk= jj.replace(/35/g, "i")
	const ll = kk.replace(/36/g, "j")
	const mm= kk.replace(/37/g, "k")
	const nn= mm.replace(/38/g, "l")
	const oo= nn.replace(/39/g, "m")
	const pp = oo.replace(/40/g, "n")
	const qq= pp.replace(/41/g, "o")
	const rr= qq.replace(/42/g, "p")
	const ss = rr.replace(/43/g, "q")
	const tt= ss.replace(/44/g, "r")
	const uu= tt.replace(/45/g, "s")
	const vv= uu.replace(/46/g, "t")
	const ww= vv.replace(/47/g, "u")
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
                timeout: 10000
            }));
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.channel.send('Specify an amount of messages to delete or purge!')
            .then(msg => msg.delete({
                timeout: 10000
            }));
        if (!amount && !user) return message.channel.send('Specify a user and amount, or just an amount, of messages to delete or purge!')
            .then(msg => msg.delete({
                timeout: 10000
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

        if(command ==="play"){
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
       if(command === "skip"){
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
            serverQueue.connection.dispatcher.end('Skip command has been used!');
            return undefined;
       }
        if(command === "stop"){
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('Stop command has been used!');
            return undefined;
	}
        if(command === "vol"){
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            return message.channel.send(`I set the volume to: **${args[1]}**`);
    }
       if(command === "np"){
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
       }
       if(command === "queue"){
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
}
        if(command === "pause"){
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return message.channel.send('Well, I guess paused the music for you!');
            }
            return message.channel.send('There is nothing playing. Like. Anywhere');
	}
      if(command === "resume"){
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
                return message.channel.send(`Sorry :( I could not join the voice channel: ${error}`);
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
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        serverQueue.textChannel.send(`Started playing: **${song.title}**`);
    }
    ////////////////////////////////////////////////////////////////MUSIC/////////////////////////////////////////////////////
});
client.login(process.env.BOT_TOKEN);
