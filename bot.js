// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

// Functions

	function userInfo(user) {
		var finalString = '';

		finalString += '**' + user.username + '**, with the **ID** of **' + user.id + '**';

		return finalString;
	}

// End of Funtions

// Vars

const prefix = '.';

// End of Vars
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  console.log('I was created by LucasGamer213');
  console.log('LucasGamer213 is the best progammer in the world!');
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`with accounts from https://ryzenalts.com`);
  client.user.setStatus('online')
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`with accounts from https://ryzenalts.com`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`with accounts from https://ryzenalts.com`);
});

// new member joins
client.on('guildMemberAdd', member => {

	console.log('User ' + member.user.username + ' has joined the server!') // console message

	var role = member.guild.roles.find('name', '🆕 Newcomer'); // Fidning roles

	member.addRole(role);
});	

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(message.content.toUpperCase().startsWith(prefix + 'USERINFO')) {
  	if(message.content.toUpperCase() === prefix + 'USERINFO') {
      message.delete().catch(O_o=>{});
  		message.channel.send(userInfo(message.author));
  	}
  }

  if(command === "help") {
      message.delete().catch(O_o=>{});
      message.reply('Commands you are allowed to use: \n \n Shop: Gives you the shop link. \n Usage: .shop \n \n Buy: Gives you the store link. \n Usage: .buy \n \n Support: Gives you information on how to make a support ticket. \n Usage: .support \n \n Userinfo: Gives you your ID. \n Usage: .userinfo');
  }

  if(command === "ping") {
  	  message.delete().catch(O_o=>{}); 
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "invite") {
  	  	message.delete().catch(O_o=>{}); 
  	try {
  		let link = await client.generateInvite(["ADMINISTRATOR"]);
  		message.channel.send(link);
  	} catch(e) {
  		console.log(e.stack);
  	}
  }

if(command === "addrole") {
  let modRole = message.guild.roles.find("name", "Moderator");
  if(message.member.roles.has(modRole.id)) {
    
  }
}


  if(command === "support") {
  	message.delete().catch(O_o=>{});
  	message.reply("Feel free to create a support ticket at #create-ticket. We will respond as soon as possible!")
  }

  if(command === "say") {
  	    	 if(!message.member.roles.some(r=>["Founder", "founder", "founders", "Founders", "Owner", "Whitelisted+", "owner", "owners", "Owners", "whitelisted+", "📝 Whitelisted+"].includes(r.name)) )
      return message.reply("Access Denied: Sorry, you don't have permissions to use this or you are not whitelisted.")
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

  if(command === "annouce") {
  	    if(!message.member.roles.some(r=>["Founder", "founder",  "founders", "Founders", "Owner", "Whitelisted+", "owner", "owners", "Owners", "whitelisted+", "Founder", "founder", "founders", "📝 Whitelisted+"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this or you are not whitelisted.")
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Founder", "founder", "founders", "Founders", "Administrators", "administrators","administrator", "Administrator", "Moderator", "Owner", "Mod", "Admin", "Admins", "admin", "admins", "Mods", "mod", "mods", "owner", "Owners", "owners","Whitelisted+", "Whitelisted", "whitelisted", "Whitelisted+", "Whitelisted+", "whitelisted+", "📝 Whitelisted+"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
  else {
  	return message.reply("Access Denied: Sorry, you don't have permissions to use this or you are not whitelisted.");
  }
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
        	message.delete().catch(O_o=>{}); 
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "buy") {
  	message.reply('You may buy accounts at https://ryzenalts.com')
  	message.delete().catch(O_o=>{}); 
  }

  if(command === "shop") {
  	message.reply('https://ryzenalts.com')
  	message.delete().catch(O_o=>{}); 
  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Founder", "founder", "founders", "Founders", "Administrators", "administrators", "administrator", "Administrator", "Moderator", "Owner", "Admin", "Admins", "admin", "admins","owner", "Owners", "owners","Whitelisted+", "Whitelisted", "whitelisted", "Whitelisted+", "📝 Whitelisted+"].includes(r.name)) )
      return message.reply("Access Denied: Sorry, you don't have permissions to use this or you are not whitelisted.");
    	message.delete().catch(O_o=>{}); 
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  if(command === ".help") {
  	 if(!message.member.roles.some(r=>["Whitelisted", "Whitelisted+", "whitelisted", "whitelisted+", "📝 Whitelisted+"].includes(r.name)) )
      return message.reply("Permission Denied: You are not whitelisted.");
    	message.delete().catch(O_o=>{}); 
  	message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "RyzenAlts:",
    url: "https://RyzenAlts.com",
    description: "A personal RyzenAlt bot made by LucasGamer213.",
    fields: [{
        name: "Owner Commands:",
        value: "Say: Makes the bot say what you want. \nUsage: .say [text] \n \n Annouce: Annouces a message. \n Usage: .annouce [message]"
      },
      {
        name: "Admin Commands:",
        value: "Ban: Bans a player \n Usage: .ban [@playername] [reason] \n \n Purge: Deletes a amount of messages. \n Usage: .purge [amount]" 
      },
      {
        name: "Mod Commands:",
        value: "Kick: kicks a player. \n Usage: .kick [@playername] [reason]"
      },
      {
        name: "User Commands:",
        value: "Shop: gives the player the shop link \n Usage: .shop \n \n Buy: Gives the player ryzenalts shop link. \n Usage: .buy \n \n Support: Gives player information on how to make a support ticket \n Usage: .support \n \n Userinfo: Gives the player ID \n Usage: .userinfo"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© RyzenAlts"
    }
  }
});
  if(command === "purge") {
  	if(!message.member.roles.some(r=>["Founder", "founder", "founders", "Administrators", "administrators", "administrator", "Administrator", "Moderator", "Owner", "Mod", "Admin", "Admins", "admin", "admins", "Mods", "mod", "mods", "owner", "Owners", "owners","Whitelisted+", "Whitelisted", "whitelisted", "whitelisted+", "📝 Whitelisted+"].includes(r.name)) )
  		return message.reply("Access Denied: Sorry, you don't have permissions to use this or you are not whitelisted.");
  	  	message.delete().catch(O_o=>{}); 
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
}
});

client.login(config.token);