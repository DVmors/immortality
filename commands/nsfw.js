const randomPuppy = require('random-puppy');
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
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
 exports.conf = {
  aliases: ['NSFW', 'nsfw']
  };
  exports.help = {
  name: "NSFW", description: "Shows random nsfw."
  }
