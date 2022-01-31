const { prefix, token } = require('./config.json');
const { Client, Intents } = require("discord.js");
const fetch = import("node-fetch");
const https = require("https");
const request = require('request');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
var array = [];


// Set the config.prefix
client.on("ready", () => {
    console.log("running");
    let data_url_global = (`https://haloruns.com/content/metadata/global.json`);
    request(data_url_global, (error3,response3,body3) => {
        if (error3) {
            console.error(error3);
        }
        else {
            var data_global = JSON.parse(body3);
            n = 0;
            o = 0;
            while (n < 9) {
            var data = data_global.Games[n].RunnableSegments
            for (var i = 0; i < data.length; i++) {
                var obj = {};
                obj["id"] = data[i].Id;
                obj["name"] = data[i].Name.toLowerCase();
                obj["abbr"] = data[i].UrlStub
                array.push(obj);
            }
            n += 1;
            }
            console.log(array);

        }
    })
    
})

client.on("messageCreate", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    if (command === "pb") {
        let [user, level, difficulty] = args;
        if(args.length > 3) {
            user = args[0];
            level = (args.slice(1, -1).join(" "));
            difficulty = args.pop();
            console.log(user, level, difficulty);
        }
        let search = array.find(search => search.name === level || search.abbr === level);
        console.log(search);
        if(user, level === undefined) {
            message.reply(`Hello, ${message.author.username} please type !pb [user] [level] [difficulty]`)
        }
        else {
            let url = (`https://haloruns.com/content/users/${user}/profile.json`);
            request(url, (error,response,body) => {
                if (error) {
                    console.error(error);
                }
                else {
                    const data = JSON.parse(body);
                    let data_url = (`https://haloruns.com/content/users/${data.UserId}/career.json`)
                    request(data_url, (error2,response2,body2) => {
                        if (error2) {
                            console.error(error2);
                        }
                        else {
                            var data2 = JSON.parse(body2);
                            var test2 = data2.RunsByCategory.Solo[0].RunnableSegmentId;
                            message.channel.send(test2);
                            
                        }
                    })
                }
            })
            message.reply(`PB for ${user} on ${(search.name.toLowerCase().split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" "))} on ${difficulty.toLowerCase().split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ")} is 69:420`);
        }
    }
    //command === h3history? etc for past pbs
  });

client.login(token);