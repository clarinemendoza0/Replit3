const config = {
  name: "top",
  aliases: ["top", "topam"],
  description: "Shows all the top users with highest money.",
  usage: "",
  cooldown: 5,
  credits: "XaviaTeam",
};

async function onCall({ message, args }) {
  const { Users } = global.controllers;
  let top = parseInt(args[0]) || 10;

  if (top > 200) top = 200;

  const allUsers = await Users.getAll();
  const topBalances = allUsers.filter((user) => user.data.money !== undefined)
    .sort((a, b) => b.data.money - a.data.money).slice(0, top);

  let messageToSend = "";
  topBalances.forEach((user, index) => {
    messageToSend += `━━━━━━${index + 1}━━━━━━\n𝗡𝗮𝗺𝗲: ${user.info.name}\n𝗕𝗮𝗹𝗮𝗻𝗰𝗲: $${Number(user.data.money).toLocaleString('en-US')} 💰\n`;
  });
  messageToSend += "";


  const resultMessage = `【𝐓𝐎𝐏 ${top} 𝐑𝐈𝐂𝐇𝐄𝐒𝐓 𝐔𝐒𝐄𝐑𝐒】\n`;
  const response = `${resultMessage}\n${messageToSend}`;

  try {
    await message.reply(response);
  } catch (err) {
    console.error(err);
  }
}

export default {
  config,
  onCall,
};
