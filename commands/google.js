const GoogleSearch = require('google-search');
var google = require('google')
module.exports.run = (client, message, args) => {

 
google.resultsPerPage = 3
var nextCounter = 0
 
google('node.js best practices', function (err, res){
  if (err) console.error(err)
 
  for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
    message.channel.send(link.title + ' - ' + link.href)
    message.channel.send(link.description + "\n")
  }
 
  if (nextCounter < 4) {
    nextCounter += 1
    if (res.next) res.next()
  }
})
}
  exports.conf = {
  aliases: ['Google', 'google']
  };
  exports.help = {
  name: "Google", description: "Googles Input."
  }
