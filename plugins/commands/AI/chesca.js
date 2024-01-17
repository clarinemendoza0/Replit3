import axios from 'axios';

const config = {
  name: "chesca",
  version: "1.0.0",
  credits: "LiANE @nealianacagara Converted by: Ruru Hussain",
  hasPermission: 0,
  usages: "[prompt]",
  cooldowns: 0
};

async function onCall({ message, args }) {
  message.reply("💗 Chesca is answering to your question!");
  try {
    const response = await axios.get(`https://lianeapi.onrender.com/@LianeAPI_Reworks/api/chesca?query=${args.join(" ")}`);
    message.reply(response.data.message, () => null);
  } catch (error) {
    console.error(error);
    message.reply("Oops! Something went wrong. Please try again later. ");
  }
};

export default {
  config,
  onCall
}