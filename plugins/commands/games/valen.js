import axios from 'axios';

const initialMoneyMin = 1e15; // 1 quadrillion
const initialMoneyMax = 1e16; // 10 quadrillion

// Set the start and end dates for the Valentine's Gift period (February 1st to 14th)
const startDate = new Date('2024-02-01T20:00:00Z').getTime(); // February 1st, 8:00 PM
const endDate = new Date('2024-02-14T22:00:00Z').getTime();   // February 14th, 10:00 PM

const config = {
  name: 'valentinesgift',
  aliases: ['valentine', 'gift'],
  description: "Claim a special Valentine's Day gift between 8pm and 10pm from February 1st to 14th!",
  usage: '',
  cooldown: 10, // 1 minute cooldown
  credits: 'Ruru',
};

async function onCall({ message }) {
  const { senderID } = message;
  const { Users } = global.controllers;
  const userData = await Users.getData(senderID);

  const currentTime = Date.now();

  // Check if it's within the specified date and time range (February 1st to 14th, 8pm to 10pm)
  if (currentTime < startDate || currentTime > endDate) {
    return message.reply(" 🎁𝗩𝗮𝗹𝗲𝗻𝘁𝗶𝗻𝗲'𝘀 𝗚𝗶𝗳𝘁 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚌𝚕𝚊𝚒𝚖𝚎𝚍 𝚋𝚎𝚝𝚠𝚎𝚎𝚗\n━━━━━━━━━━━━━━━\n8𝚙𝚖 𝚊𝚗𝚍 10𝚙𝚖 𝚏𝚛𝚘𝚖 𝙵𝚎𝚋𝚛𝚞𝚊𝚛𝚢 1𝚜𝚝 𝚝𝚘 14𝚝𝚑.");
  }

  // Check if the user has already claimed the gift
  if (userData.valentineGiftClaimed) {
    return message.reply("❌ You've already claimed the Valentine's Gift. Come back next year!");
  }

  try {
    // Generate a random initial money amount for the user
    const initialMoney = Math.floor(Math.random() * (initialMoneyMax - initialMoneyMin + 1)) + initialMoneyMin;

    // Add the initial money to the user's balance
    await Users.increaseMoney(senderID, initialMoney);

    // Update the user data to mark the gift as claimed
    await Users.updateData(senderID, { valentineGiftClaimed: true });

    // Display a message with the winning reward
    const valentinesGiftMessage = `🎁 Congratulations! You've received a special Valentine's Gift: $${initialMoney.toLocaleString()}`;
    return message.reply(valentinesGiftMessage);
  } catch (error) {
    console.error('Error in valentinesgift:', error);

    // Return the specific error message to the user
    return message.reply(`An error occurred while processing the Valentine's Gift: ${error.message}. Please try again later.`);
  }
}

export default {
  config,
  onCall,
};
