import axios from 'axios';
import fs from 'fs';
import gtts from 'gtts';
import path from 'path';

export const config = {
  name: "demo",
  version: "2.1.3",
  credits: "Hazeyy (Converted by Grim)",
  description: "( 𝙂𝙋𝙏-4 𝙑𝙤𝙞𝙘𝙚 𝙭 𝙄𝙢𝙖𝙜𝙚 𝙧𝙚𝙘𝙤𝙜𝙣𝙞𝙩𝙞𝙤𝙣 )",
  usage: "( Model-v3 Demo GPT-4 )",
  cooldown: 3,
};

function formatFont(text) {
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

async function convertImageToText(imageURL) {
  try {
    const response = await axios.get(`https://hazeyy-api-img2text.kyrinwu.repl.co/api/recognition/image2text?input=${encodeURIComponent(imageURL)}`);
    return response.data.extractedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function onCall({ message }) {

  const { type, messageReply, body } = message;

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      const attachment = messageReply.attachments[0];
      const imageURL = attachment.url;
      question = await convertImageToText(imageURL);

      if (!question) {
        message.reply('❗ | 𝖴𝗇𝖺𝖻𝗅𝖾 𝗍𝗈 𝖼𝗈𝗇𝗏𝖾𝗋𝗍 𝗍𝗁𝖾 𝗉𝗁𝗈𝗍𝗈, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗌𝗎𝗋𝖾 𝗂𝗆𝖺𝗀𝖾𝗌 𝖺𝗋𝖾 𝖼𝗅𝖾𝖺𝗋 𝖻𝖾𝖿𝗈𝗋𝖾 𝗌𝖾𝗇𝖽𝗂𝗇𝗀.');
        return;
      }
    } else {
      question = messageReply?.body?.trim() || '';
    }
  } else { 
    question = body.slice(5).trim();
  }

  if (!question) {
    message.reply("𝖧𝖾𝗅𝗅𝗈👋, 𝖨 𝖺𝗆 𝖬𝗈𝖽𝖾𝗅-𝗏3 𝖣𝖾𝗆𝗈 𝖦𝖯𝖳-4, 𝖣𝖾𝗌𝗂𝗀𝗇 𝖺𝗇𝖽 𝗋𝖾𝗆𝗈𝖽𝖾𝖽 𝖻𝗒 𝖧𝖺𝗓𝖾𝗒𝗒 𝖺𝗇𝖽 𝖼𝗈𝗇𝗏𝖾𝗋𝗍𝖾𝖽 𝖻𝗒 𝖦𝗋𝗂𝗆. \n\n𝖧𝗈𝗐 𝖼𝖺𝗇 𝗂 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?");
    return;
  }

  try {
    global.api.sendTypingIndicator(message.threadID);

    message.reply('🗨️ | 𝖣𝖾𝗆𝗈 𝖦𝖯𝖳-4 𝗂𝗌 𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀...');

    const response = await axios.get(`https://hazeyy-gpt4-api.kyrinwu.repl.co/api/gpt4/v-3beta?content=${encodeURIComponent(question)}`);

    const reply = response.data.reply;

    if (reply.trim() !== "") {
      const formattedReply = formatFont(reply);

      const gttsService = new gtts(formattedReply, 'en');
      const pathGpt = path.join(global.cachePath, `${message.threadID}_${Date.now()}_gpt4_response.mp3`);
      gttsService.save(pathGpt, function () {
        message.reply(`🤖 𝗚𝗣𝗧-4 ( 𝗗𝗲𝗺𝗼 )\n\n🗨️: ${formattedReply}\n\n𝖨 𝗁𝗈𝗉𝖾 𝗂𝗍 𝗁𝖾𝗅𝗉𝗌 ✨`);

        message.reply(
          {
            attachment: fs.createReadStream(pathGpt),
            body: '🔊 𝗗𝗲𝗺𝗼 𝗚𝗣𝗧-4 ( 𝗩𝗼𝗶𝗰𝗲 )',
            mentions: [
              {
                tag: 'GPT-4 Response',
                id: global.api.getCurrentUserID(),
              },
            ],
          },
        );
      });
    } else {
      message.reply("🤖 | 𝗗𝗲𝗺𝗼 𝗚𝗣𝗧-4 𝗰𝗼𝘂𝗹𝗱𝗻'𝘁 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗿𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝘁𝗼 𝘆𝗼𝘂𝗿 𝗾𝘂𝗲𝗿𝘆.");
    }
  } catch (error) {
    console.error(error);
    message.reply("🔴 | 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗲𝗱. 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿.");
  }
};