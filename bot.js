
const readline = require("readline");

const fetch = require('node-fetch');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.on('unhandledRejection', error => {
return;
});

let asd = rl.question("[1] Notifications Disabler\n[2] Quit\nSelect Your Action: ", function(answer) {
if(answer === '1') {
  rl.question("Enter An Token: ", function(tokens) {

   const makeRequest = async (method, url, body) => {
    const res = await fetch(url, {
        headers: {
            authorization: tokens,
            'content-type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined,
        method
    });
    const json = await res.json();
    return json;
};

const getGuilds = async () => {
    const res = await makeRequest('GET', 'https://discordapp.com/api/v8/users/@me/guilds');
    return res;
};

const startAt = Date.now();
getGuilds().then(async (guilds) => {
    for (const guild of guilds) {
        await makeRequest('PATCH', `https://discordapp.com/api/v8/users/@me/guilds/${guild.id}/settings`, {
          message_notifications: 0,
          mobile_push: true,
          mute_config: null,
          muted: true,
          suppress_everyone: true,
          suppress_roles: true
        });
    }
    console.log(chalk.bold(chalk.green(`Done. Notifications disabled for ${guilds.length} servers in ${(Date.now() - startAt) / 1000}s.`)));
});


  })
  



}
})


rl.on("close", function() {
  console.log("\nCya Later. Github: xTriquetra");
  process.exit(0);
});






