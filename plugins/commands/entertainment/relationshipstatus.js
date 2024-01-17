import path from 'path';

const config = {
  name: "relationshipstatus",
  aliases: ["rs", "relationstatus"],
  version: "6.0.0",
  credits: "August Quinn",
  description: "Check love compatibility and chances of a successful love relationship!",
  usage: "[your_name] [partner_name]",
  cooldown: 5
};

const gifPath = path.join(global.assetsPath, "lovecompatibility.gif");

let isReady = false;

async function onLoad() {
  global.downloadFile(gifPath, "https://i.ibb.co/fM1k55L/3ypE.gif")
    .then(_ => {
      isReady = true;
    })
}

async function onCall({ message, args }) {
  if (!isReady) return message.reply("The command is not ready.");

  const { threadID, messageID } = message;
  try {
    if (args.length !== 2) {
      message.reply("Provide two names for love compatibility check!");
      return;
    }

    const [yourName, partnerName] = args;
    const compatibilityScore = calculateCompatibility(yourName, partnerName);
    const compatibilityMessage = getCompatibilityMessage(compatibilityScore);
    const additionalInfo = getAdditionalInfo(compatibilityScore);
    const passionLevel = getPassionLevel(compatibilityScore);
    const commitmentLevel = getCommitmentLevel(compatibilityScore);
    const communicationLevel = getCommunicationLevel(compatibilityScore);
    const humorLevel = getHumorLevel(compatibilityScore);
    const trustLevel = getTrustLevel(compatibilityScore);
    const emotionalIntimacy = getEmotionalIntimacy(compatibilityScore);
    const sharedValues = getSharedValues(compatibilityScore);
    const growthPotential = getGrowthPotential(compatibilityScore);

    const resultMessage = `💖 𝗟𝗢𝗩𝗘 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗧𝗬 𝗖𝗛𝗘𝗖𝗞\n\n${yourName} + ${partnerName}\n\n${compatibilityMessage}\n\n${additionalInfo}\n\n𝗣𝗮𝘀𝘀𝗶𝗼𝗻 𝗟𝗲𝘃𝗲𝗹: ${passionLevel}\n𝗖𝗼𝗺𝗺𝗶𝘁𝗺𝗲𝗻𝘁 𝗟𝗲𝘃𝗲𝗹: ${commitmentLevel}\n𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗟𝗲𝘃𝗲𝗹: ${communicationLevel}\n𝗛𝘂𝗺𝗼𝗿 𝗟𝗲𝘃𝗲𝗹: ${humorLevel}\n𝗧𝗿𝘂𝘀𝘁 𝗟𝗲𝘃𝗲𝗹: ${trustLevel}\n𝗘𝗺𝗼𝘁𝗶𝗼𝗻𝗮𝗹 𝗜𝗻𝘁𝗶𝗺𝗮𝗰𝘆: ${emotionalIntimacy}\n𝗦𝗵𝗮𝗿𝗲𝗱 𝗩𝗮𝗹𝘂𝗲𝘀: ${sharedValues}\n𝗚𝗿𝗼𝘄𝘁𝗵 𝗣𝗼𝘁𝗲𝗻𝘁𝗶𝗮𝗹: ${growthPotential}\n\n𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝘁𝘆 𝗦𝗰𝗼𝗿𝗲: ${compatibilityScore}%`;

    message.reply(
      {
        body: resultMessage,
        attachment: global.reader(gifPath),
      }
    );

  } catch (error) {
    console.error("Error checking love compatibility:", error);
    message.reply("Error checking love compatibility. Try again with different names!");
  }
};

function calculateCompatibility(name1, name2) {

  const combinedNames = (name1 + name2).toLowerCase();
  const uniqueLetters = [...new Set(combinedNames)];
  const compatibilityScore = uniqueLetters.length * 10;

  return Math.min(compatibilityScore, 100);
}

function getCompatibilityMessage(score) {
  if (score >= 80) {
    return "🌟 You're a perfect match made in heaven!";
  } else if (score >= 60) {
    return "💑 Your love is strong and promising!";
  } else if (score >= 40) {
    return "🤔 There are some challenges, but love can conquer all!";
  } else {
    return "💔 Keep the faith, love has its ups and downs!";
  }
}

function getAdditionalInfo(score) {
  if (score >= 80) {
    return "✨ You share deep emotional and spiritual connections.";
  } else if (score >= 60) {
    return "💖 Communication is key to maintaining a healthy relationship.";
  } else if (score >= 40) {
    return "🔍 Understanding each other's differences is crucial.";
  } else {
    return "🌧️ Every storm in a relationship makes you stronger together.";
  }
}

function getPassionLevel(score) {
  if (score >= 80) {
    return "🔥 Intense and fiery passion!";
  } else if (score >= 60) {
    return "💓 Sincere and genuine affection.";
  } else if (score >= 40) {
    return "🌹 Steady and growing love.";
  } else {
    return "❤️ Love that withstands the tests of time.";
  }
}

function getCommitmentLevel(score) {
  if (score >= 80) {
    return "💍 Fully committed to each other.";
  } else if (score >= 60) {
    return "🤝 Building a strong foundation of commitment.";
  } else if (score >= 40) {
    return "🌱 Nurturing a commitment that's still growing.";
  } else {
    return "⏳ Committed to facing challenges together.";
  }
}

function getCommunicationLevel(score) {
  if (score >= 80) {
    return "🗨️ Excellent communication skills!";
  } else if (score >= 60) {
    return "💬 Good communication, always express your feelings.";
  } else if (score >= 40) {
    return "🤐 Sometimes struggles with communication, work on expressing yourselves.";
  } else {
    return "🔇 Communication is a bit challenging, but there's room for improvement.";
  }
}

function getHumorLevel(score) {
  if (score >= 80) {
    return "😄 Endless laughter together!";
  } else if (score >= 60) {
    return "😊 Share a good sense of humor, keep making each other laugh.";
  } else if (score >= 40) {
    return "😐 Humor may differ, find common ground and enjoy laughter together.";
  } else {
    return "😕 Humor can be a challenge, but find joy in other aspects of your relationship.";
  }
}

function getTrustLevel(score) {
  if (score >= 80) {
    return "🤝 Trust each other completely!";
  } else if (score >= 60) {
    return "🤔 Build trust by being honest and transparent with each other.";
  } else if (score >= 40) {
    return "🔍 Trust is a work in progress, focus on building a solid foundation.";
  } else {
    return "🚫 Trust may be a challenge, but with effort, you can overcome doubts.";
  }
}

function getEmotionalIntimacy(score) {
  if (score >= 80) {
    return "🌈 Deep emotional connections, understanding each other's feelings effortlessly.";
  } else if (score >= 60) {
    return "💗 Growing emotional intimacy, share your vulnerabilities and joys.";
  } else if (score >= 40) {
    return "💔 Emotional intimacy needs nurturing, open up to each other to strengthen it.";
  } else {
    return "💧 Emotional intimacy may require more effort, but it's worth building.";
  }
}

function getSharedValues(score) {
  if (score >= 80) {
    return "🌍 Aligned values and beliefs, creating a harmonious and purposeful life together.";
  } else if (score >= 60) {
    return "🤝 Some shared values, work on understanding and respecting each other's perspectives.";
  } else if (score >= 40) {
    return "🔄 Different values, find common ground and celebrate your differences.";
  } else {
    return "❓ Shared values might need exploration and discussion for a stronger connection.";
  }
}

function getGrowthPotential(score) {
  if (score >= 80) {
    return "🌱 Endless opportunities for personal and collective growth.";
  } else if (score >= 60) {
    return "🚀 Significant potential for growth, support each other's aspirations.";
  } else if (score >= 40) {
    return "🌧️ Some challenges in growth, work together to overcome obstacles.";
  } else {
    return "🔒 Growth potential may require focused efforts, but it's achievable.";
  }
}

export default {
  config,
  onLoad,
  onCall
  }