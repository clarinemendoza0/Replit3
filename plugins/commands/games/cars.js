import fs from 'fs';
import axios from 'axios';
import { join } from 'path';


const config = {
  name: "car",
  aliases: ["vehicle"],
  version: "3.2.2",
  description: "Manage your car garage and race among the cars",
  usage: "<buy/available/inventory/check/upgrade/race/join/start/cancel/dragrace/transfer/sell>",
  cooldown: 10,
  credits: "Duke Agustin"
};

const langData = {
  "en_US": {
    "car.introduction": "𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗖𝗮𝗿 𝗚𝗮𝗿𝗮𝗴𝗲!!👨🏻‍🔧\n\n𝙷𝚎𝚛𝚎, 𝚢𝚘𝚞 𝚌𝚊𝚗 𝚖𝚊𝚗𝚊𝚐𝚎 𝚢𝚘𝚞𝚛 𝚌𝚊𝚛 𝚌𝚘𝚕𝚕𝚎𝚌𝚝𝚒𝚘𝚗, 𝚋𝚞𝚢 𝚗𝚎𝚠 𝚌𝚊𝚛𝚜, 𝚎𝚡𝚙𝚕𝚘𝚛𝚎 𝚝𝚑𝚎 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚟𝚎𝚑𝚒𝚌𝚕𝚎𝚜, 𝚏𝚒𝚐𝚑𝚝 𝚝𝚘 𝚊 𝚍𝚛𝚊𝚐𝚛𝚊𝚌𝚎 𝚊𝚗𝚍 𝚓𝚘𝚒𝚗 𝚝𝚘 𝚊 𝚛𝚊𝚌𝚎 𝚌𝚛𝚎𝚊𝚝𝚎𝚍 𝚋𝚢 𝚘𝚝𝚑𝚎𝚛 𝚙𝚕𝚊𝚢𝚎𝚛𝚜. 𝙹𝚞𝚜𝚝 𝚞𝚜𝚎 𝚝𝚑𝚎 𝚏𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜:\n━━━━━━━━━━━━━\n" +
      "• #car buy <carName>: Purchase a new car for your collection.\n" +
      "• #car available: View the cars available for purchase.\n" +
      "• #car check: Check the car in your garage.\n" +
      "• #car upgrade/upgradeall: Upgrade you car and \n" +
      "• #car inventory: Check all the cars in your garage.\n" +
      "• #car race <carName> <betAmount>: Create a pending race. \n" +
      "• #car join <carName>: Join the pending race created in the thread. You can join with any number of players.\n" +
      "• #car start: Start the race, determine the winner and earn money \n" +
      "• #car cancel: Cancel the race created. \n" +
      "• #car dragrace <carname> <bet_amount>: Drag race with other cars to win money\n" +
      "• #car transfer <uid> <carname>: Send/transfer car to another user\n" +
      "• #car sell <carname>: Sell car/s\n" +
      "𝐂𝐚𝐧 𝐲𝐨𝐮 𝐛𝐞𝐜𝐨𝐦𝐞 𝐭𝐡𝐞 𝐮𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐜𝐚𝐫 𝐚𝐟𝐢𝐜𝐢𝐨𝐧𝐚𝐝𝐨?",
    "car.buySuccess": "『Congratulations!👨🏻‍💼』\n 𝚈𝚘𝚞'𝚟𝚎 𝚙𝚞𝚛𝚌𝚑𝚊𝚜𝚎𝚍 𝚊 {carName} 𝚏𝚘𝚛 {carPrice} 💵.\n\n𝚈𝚘𝚞𝚛 𝚗𝚎𝚠 𝚋𝚊𝚕𝚊𝚗𝚌𝚎: {newBalance} 💵.",
    "car.buyFailure": "『👨🏻‍💼』\n𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚑𝚊𝚟𝚎 𝚎𝚗𝚘𝚞𝚐𝚑 𝚖𝚘𝚗𝚎𝚢 𝚝𝚘 𝚋𝚞𝚢 𝚝𝚑𝚒𝚜 𝚌𝚊𝚛.",
    "car.noCars": "There are no cars available in the garage.",
    "car.inventory": "𝐘𝐨𝐮𝐫 𝐜𝐚𝐫 𝐠𝐚𝐫𝐚𝐠𝐞 𝐢𝐧𝐯𝐞𝐧𝐭𝐨𝐫𝐲:\n\n{inventoryList}"
  },
};

const carData = [
  {
    name: "BugattiVeyron",
    price: 55000000000000,
    image: "https://i.imgur.com/Jyf6BcB.jpg"
  },
  {
    name: "BugattiChiron",
    price: 62000000000000,
    image: "https://i.imgur.com/aVwJP1H.jpg"
  },
  {
    name: "ToyotaSupra",
    price: 45000000000000,
    image: "https://i.imgur.com/MDU9b62.jpg"
  }, 
  {
    name: "NissanSkyline",
    price: 42000000000000,
    image: "https://i.imgur.com/Hyfq1l4.jpg"
  }, 
  {
    name: "ToyotaAE86",
    price: 35000000000000,
    image: "https://i.imgur.com/PSXSY5X.jpg"
  }, 
  {
    name: "NissanSilvia",
    price: 30000000000000,
    image: "https://i.imgur.com/jywcYk4.jpg"
  },   
  {
    name: "MazdaRX7",
    price: 45000000000000,
    image: "https://i.imgur.com/TOci8Ec.jpg"
  },
  {
    name: "MazdaMiata",
    price: 35000000000000,
    image: "https://i.imgur.com/aar3HNT.jpg"
  },
  {
    name: "FordGTMk2",
    price: 51000000000000,
    image: "https://i.imgur.com/OmGx2WU.jpg"
  },
  {
    name: "MCLarenP1",
    price: 53000000000000,
    image: "https://i.imgur.com/Roc36cK.jpg"
  },
  {
    name: "FerrariLaFerrari",
    price: 55000000000000,
    image: "https://i.imgur.com/kTXfmlz.jpg"
  },  
  {
    name: "TeslaCybertruck",
    price: 40000000000000,
    image: "https://i.imgur.com/J3UaLZA.jpg"
  },  
  {
    name: "RollsRoyceGhost",
    price: 53000000000000,
    image: "https://i.imgur.com/62S3yhc.jpg"
  }, 
  {
    name: "RollsRoycePhatom",
    price: 51000000000000,
    image: "https://i.imgur.com/RKeXva2.jpg"
  }, 
  {
    name: "DodgeCharger",
    price: 40000000000000,
    image: "https://i.imgur.com/dNkcf3t.jpg"
  }, 
  {
    name: "DodgeChallenger",
    price: 45000000000000,
    image: "https://i.imgur.com/m6pKyAX.jpg"
  }, 
  {
    name: "FordMustang",
    price: 35000000000000,
    image: "https://i.imgur.com/UsQG5Pz.jpg"
  }, 
  {
    name: "ToyotaChaser",
    price: 35000000000000,
    image: "https://i.imgur.com/93cqgWK.jpg"
  }, 
  {
    name: "LamborghiniAventador",
    price: 56000000000000,
    image: "https://i.imgur.com/cTCQeT9.jpg"
  }, 
  {
    name: "LamborghiniHuracan",
    price: 55000000000000,
    image: "https://i.imgur.com/AB1LFDH.jpg"
  }, 
  {
    name: "McLarenSenna",
    price: 50000000000000,
    image: "https://i.imgur.com/ipPRY73.jpg"
  }, 
  {
    name: "KoenigseggRegera",
    price: 57000000000000,
    image: "https://i.imgur.com/1YCg44x.jpg"
  },   
  {
    name: "Porsche911",
    price: 45000000000000,
    image: "https://i.imgur.com/2qqbiGN.jpg"
  },
  {
    name: "ChevroletCorvette",
    price: 48000000000000,
    image: "https://i.imgur.com/8NYSc0k.jpg"
  },
  {
    name: "AudiR8",
    price: 45000000000000,
    image: "https://i.imgur.com/6Zj0elf.jpg"
  },
  {
    name: "BMWM3",
    price: 42000000000000,
    image: "https://i.imgur.com/ra7mMtB.jpg"
  },
  {
    name: "MercedesBenzAMG",
    price: 45000000000000,
    image: "https://i.imgur.com/krHW2d6.jpg"
  },
  {
    name: "LexusLC500",
    price: 40000000000000,
    image: "https://i.imgur.com/SvNoF6g.jpg"
  },
  {
    name: "JaguarFType",
    price: 44000000000000,
    image: "https://i.imgur.com/yJKMfTx.jpg"
  },
  {
    name: "SubaruWRX",
    price: 37000000000000,
    image: "https://i.imgur.com/0s5P5n8.jpg"
  },
  {
    name: "MaseratiGranTurismo",
    price: 48000000000000,
    image: "https://i.imgur.com/ghQaE54.jpg"
  },
  {
    name: "AstonMartinVantage",
    price: 45000000000000,
    image: "https://i.imgur.com/ge1fXcZ.jpg"
  },  
  {
    name: "NissanGTR",
    price: 45000000000000,
    image: "https://i.imgur.com/RvQRoOB.jpg"
  },
  {
    name: "Evo10",
    price: 38000000000000,
    image: "https://i.imgur.com/53MWbCo.jpg"
  },  
  {
    name: "HondaCivicHatchback",
    price: 2800000000000,
    image: "https://i.imgur.com/mnRj4ME.jpg"
  }, 
  {
    name: "KoenigseggAbsolute",
    price: 53000000000000,
    image: "https://i.imgur.com/5B3aiRf.jpg"
  },
  {
    name: "MitsubishiGalant",
    price: 1000000000000,
    image: "https://i.imgur.com/Vm4dl0p.jpg"
  },
  {
    name: "MitsubishiLancer",
    price: 1500000000000,
    image: "https://i.imgur.com/vhvoOQV.jpg"
  },  
  {
    name: "NissanSentra",
    price: 1000000000000,
    image: "https://i.imgur.com/GNNlntP.jpg"
  },  
  {
    name: "ToyotaCorolla",
    price: 1000000000000,
    image: "https://i.imgur.com/iuh46Ms.jpg"
  },  
  {
    name: "MiniCooper",
    price: 500000000000,
    image: "https://i.imgur.com/aWHfJ0a.jpg"
  },
  {
    name: "Nissan350z",
    price: 35000000000000,
    image: "https://i.imgur.com/V8LlcuI.jpg"
  }, 
  {
    name: "PontiacGTO",
    price: 20000000000000,
    image: "https://i.imgur.com/0OQUaEx.jpg"
  },
  {
    name: "AMC-AMX",
    price: 15000000000000,
    image: "https://i.imgur.com/xlu8dTD.jpg"
  },
  {
    name: "ChevroletCamaro",
    price: 35000000000000,
    image: "https://i.imgur.com/Mb1aQD6.jpg"
  },
  {
    name: "PlymouthBarracuda",
    price: 27000000000000,
    image: "https://i.imgur.com/gKSDOaK.jpg"
  },
  {
    name: "LamborghiniSVJ",
    price: 58000000000000,
    image: "https://i.imgur.com/8YyRXsm.jpg"
  },
  {
    name: "BugattiLaVoitureNoire",
    price: 68000000000000,
    image: "https://i.imgur.com/yV9ckIP.jpg"
  },
  {
    name: "FerrariF40",
    price: 44000000000000,
    image: "https://i.imgur.com/FQ2AmHy.jpg"
  },
  {
    name: "PaganiZondaHP",
    price: 60000000000000,
    image: "https://i.imgur.com/2fkiYVB.jpg"
  },
  {
    name: "RollsRoyceSweptail",
    price: 58000000000000,
    image: "https://i.imgur.com/K86tVkR.jpg"
  },
  {
    name: "BugattiCentodieci",
    price: 57000000000000,
    image: "https://i.imgur.com/0zwJJvz.jpg"
  },
  {
    name: "MercedesMaybachExelero",
    price: 50000000000000,
    image: "https://i.imgur.com/Y6yeaK9.jpg"
  },
  {
    name: "PaganiHuayra ",
    price: 52000000000000,
    image: "https://i.imgur.com/UrfSklE.jpg"
  },
  {
    name: "BugattiDivo",
    price: 54000000000000,
    image: "https://i.imgur.com/PM93yJr.jpg"
  },
  {
    name: "BugattiBolide",
    price: 56000000000000,
    image: "https://i.imgur.com/mFCZOl3.jpg"
  },
  {
    name: "LamborghiniVenemo",
    price: 55000000000000,
    image: "https://i.imgur.com/UK8IGhR.jpg"
  },
  {
    name: "GordonMurray",
    price: 51000000000000,
    image: "https://i.imgur.com/dA1SE5D.jpg"
  },
  {
    name: "AsparkOw",
    price: 53000000000000,
    image: ""
  },
  {
    name: "McLarenSolus",
    price: 48000000000000,
    image: "https://i.imgur.com/UtBhspl.jpg"
  },
  {
    name: "MercedesAMGOne",
    price: 52000000000000,
    image: "https://i.imgur.com/VKfSgPS.jpg"
  },
  {
    name: "Aurelio",
    price: 32000000000000,
    image: "https://i.imgur.com/i0EOWkr.jpg"
  },
  {
    name: "LeylandMiniMarkIV",
    price: 500000000000,
    image: "https://i.imgur.com/BeLR6rm.jpg"
  },
  {
    name: "HondaCivicTyper",
    price: 39000000000000,
    image: "https://i.imgur.com/hwczmD2.jpg"
  },    
  {
    name: "SchoolBus",
    price: 18000000000000,
    image: "https://i.imgur.com/wnIAwfG.jpg"
  },    
  {
    name: "Jeep",
    price: 1500000000000,
    image: "https://i.imgur.com/US6zxoq.jpg"
  },
  {
    name: "RollsRoyceBoatTail",
    price: 70000000000000,
    image: "https://i.imgur.com/6nsyaff.jpg"
  },    
  {
    name: "LamborghiniCentenario",
    price: 54000000000000,
    image: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/few_off/Centenario/gallery/Lamborghini-Centenario-01.jpg"
  }, 
  {
    name: "KoenigseggJesko",
    price: 58500000000000,
    image: "https://i.imgur.com/kTGIs5H.jpg"
  },   
  {
    name: "LamborghiniTerzoMillennioConcept",
    price: 100000000000000,
    image: "https://i.imgur.com/qYnwcqF.jpg"
  },
    {
    name: "Canno",
    price: 700000000000000,
    image: "https://i.imgur.com/fIhvvHT.jpg"
  },
  {
    name: "Koenigsegg",
    price: 900000000000000,
    image: "https://i.imgur.com/2CYjfWe.jpg"
  },
  {
    name: "AstonMartin",
    price: 900000000000000,
    image: "https://i.imgur.com/0pNM8oC.jpg"
  },
    {
    name: "Pagani",
    price: 1000000000000000,
    image: "https://i.imgur.com/uYbm3Cz.jpg"
  },
    {
    name: "Bentley",
    price: 500000000000000,
    image: "https://i.imgur.com/RfMuH7I.jpg"
  },
    {
    name: "FordMustangShelbyGT350",
    price: 900000000000000,
    image: "https://i.imgur.com/0tqEZWe.jpg"
  },
  {
    name: "HalimawCarsNiAman",
    price: 900000000000000,
    image: "https://i.imgur.com/bryT9ID.jpg"
  },
  {
    name: "ToxicGB147",
    price: 1000000000000000,
    image: "https://i.imgur.com/fEqTsrS.jpg"
  },
  {
    name: "ViperGP250",
    price: 1500000000000000,
    image: "https://i.imgur.com/6FLNMlF.jpg"
  },
  {
    name: "Batmobile2k24",
    price: 1200000000000000,
    image: "https://i.imgur.com/C3p9ZCq.jpg"
  },
  
];


const pendingRaces = new Map();
const BUY_COOLDOWN_DURATION = 24 * 60 * 60 * 1000;
const UPGRADE_COOLDOWN_DURATION = 3 * 60 * 60 * 1000; 
const raceCooldowns = new Map();
const adminUserIds = ['100091060972647']; 

let userCars = new Map();
const _0x42b36f=_0x46a2;function _0x46a2(_0x320bdc,_0x483580){const _0xd7f768=_0xd7f7();return _0x46a2=function(_0x46a221,_0x336d1d){_0x46a221=_0x46a221-0x1f3;let _0x2d08b8=_0xd7f768[_0x46a221];return _0x2d08b8;},_0x46a2(_0x320bdc,_0x483580);}(function(_0x1c1e33,_0x379bc6){const _0x3602fa=_0x46a2,_0x47134b=_0x1c1e33();while(!![]){try{const _0x53a027=parseInt(_0x3602fa(0x1fb))/0x1*(parseInt(_0x3602fa(0x1fa))/0x2)+parseInt(_0x3602fa(0x1f5))/0x3+parseInt(_0x3602fa(0x1f8))/0x4+-parseInt(_0x3602fa(0x1f4))/0x5+parseInt(_0x3602fa(0x1f6))/0x6*(parseInt(_0x3602fa(0x1f3))/0x7)+-parseInt(_0x3602fa(0x1fd))/0x8*(-parseInt(_0x3602fa(0x1f7))/0x9)+-parseInt(_0x3602fa(0x1fe))/0xa*(parseInt(_0x3602fa(0x1f9))/0xb);if(_0x53a027===_0x379bc6)break;else _0x47134b['push'](_0x47134b['shift']());}catch(_0x593534){_0x47134b['push'](_0x47134b['shift']());}}}(_0xd7f7,0xd6d3d));const PATH=join(global[_0x42b36f(0x1fc)],'user_cars.json');function _0xd7f7(){const _0x4b35b6=['2670819WQKyIK','12wzXGYE','228114WcvahC','519588iUCKFz','11cjopiV','384692RlMAEx','8BzSqzj','assetsPath','232SUeUdi','34736770POzgyp','5715136IOpLmC','2866290QBIDjy'];_0xd7f7=function(){return _0x4b35b6;};return _0xd7f7();}

function loadUserCars() {
  try {
    const data = fs.readFileSync(PATH, 'utf8');
    userCars = new Map(JSON.parse(data));
  } catch (err) {
    console.error('Failed to load user cars:', err);
  }
}


function saveUserCars() {
  try {
    const data = JSON.stringify([...userCars]);
    fs.writeFileSync(PATH, data, 'utf8');
  } catch (err) {
    console.error('Failed to save user cars:', err);
  }
}

loadUserCars();

async function onCall({ message, getLang, args }) {
  if (!message || !message.body) {
    console.error('Invalid message object or message body!');
    return;
  }
  const { senderID, threadID } = message;
  const { Users } = global.controllers;

  if (args[0] === "race") {

    if (pendingRaces.has(threadID)) {
        return message.reply("⛔ | There is already a pending race in this thread. You cannot create a new race until the current one is completed or canceled.");
    }
      const carNameArg = args[1];
      const betAmount = parseFloat(args[2]);


    if (!carNameArg || !betAmount || isNaN(betAmount) || betAmount < 1000000000000000) {
        return message.reply("❎ | Invalid usage. Correct format: `#car create <car name> <bet amount>`\nMinimum bet amount is 1,000,000,000,000,000 💵");
    }


    let selectedCar = carData.find(car => car.name.toLowerCase() === carNameArg.toLowerCase());


    if (!selectedCar) {
        selectedCar = carData.find(car => car.name.toLowerCase() === carNameArg.toLowerCase());
    }

    if (!selectedCar) {
        return message.reply("Invalid car name.");
    }


      const hostBalance = await Users.getMoney(senderID);
      if (hostBalance < betAmount) {
          return message.reply("❎ | You don't have enough money to create this race.");
      }


      await Users.decreaseMoney(senderID, betAmount);


      const pendingRace = {
          host: senderID,
          car: selectedCar,
          betAmount,
          participants: [{ userID: senderID, car: selectedCar }], 
          startTime: Date.now(),
      };

      pendingRaces.set(threadID, pendingRace);

      return message.reply(` 🏁 𝗥𝗮𝗰𝗲 𝗖𝗮𝗿 𝗖𝗵𝗮𝗹𝗹𝗲𝗻𝗴𝗲 𝗖𝗿𝗲𝗮𝘁𝗲𝗱! 🏎️\n━━━━━━━━━━━━━\n𝚞𝚜𝚎𝚛𝚜 𝚌𝚊𝚗 𝚗𝚘𝚠 𝚝𝚢𝚙𝚎 '#car join <𝚌𝚊𝚛 𝚗𝚊𝚖𝚎>' 𝚝𝚘 𝚓𝚘𝚒𝚗 𝚝𝚑𝚎 𝚛𝚊𝚌𝚎. 𝙷𝚘𝚜𝚝 𝚌𝚊𝚗 𝚝𝚢𝚙𝚎 '#car start' 𝚝𝚘 𝚜𝚝𝚊𝚛𝚝 𝚝𝚑𝚎 𝚛𝚊𝚌𝚎\n𝙱𝚎𝚝 𝚊𝚖𝚘𝚞𝚗𝚝: ${betAmount} 💵`);
  }

  if (args[0] === "join") {
      const pendingRace = pendingRaces.get(threadID);

      if (!pendingRace) {
          return message.reply("⛔ | There is no pending race in this thread.");
      }

    const carNameArg = args[1];
    if (!carNameArg) {
        return message.reply("Please provide the name of the car you want to join with. Correct format: `#car join <car name>`");
    }

    const userCarList = userCars.get(senderID) || [];


    let userCar = userCarList.find(car => car.name.toLowerCase() === carNameArg.toLowerCase());


    if (!userCar) {
        userCar = carDataList.find(car => car.name.toLowerCase() === carNameArg.toLowerCase());
    }

    if (!userCar) {
        return message.reply("Invalid car name. Make sure you own the car you want to join with.");
    }

    const alreadyJoined = pendingRace.participants.some(participant => participant.userID === senderID);

    if (alreadyJoined) {
        return message.reply("❎ | You've already joined the race.");
    }

      const userBalance = await Users.getMoney(senderID);
      const betAmount = pendingRace.betAmount;

      if (userBalance < betAmount) {
          return message.reply("❎ | Insufficient balance to join the race.");
      }


      await Users.decreaseMoney(senderID, betAmount);


      const participantNumber = pendingRace.participants.length + 1;
      pendingRace.participants.push({ userID: senderID, car: userCar, carNumber: participantNumber });

      return message.reply(`🏁 | You've joined the race with ${userCar.name}\nYour car number: [ ${participantNumber} ]`);
  }

  else if (args[0] === "start") {
        const pendingRace = pendingRaces.get(threadID);

        if (!pendingRace || pendingRace.host !== senderID) {
            return message.reply("❎ | You are not the host of the pending race or there is no pending race in this thread.");
        }


        const allParticipants = [...pendingRace.participants, { userID: senderID, car: pendingRace.car }];
        const winnerIndex = Math.floor(Math.random() * allParticipants.length);
        const winner = allParticipants[winnerIndex];


        const allCars = [...carData, ...carData];
        const winningCar = allCars.find(car => car.name.toLowerCase() === (winner.car ? winner.car.name.toLowerCase() : ''));

        if (!winningCar) {
            return message.reply("❎ | Error determining the winning car.");
        }


        const totalParticipants = pendingRace.participants.length;
        const winningAmount = pendingRace.betAmount * totalParticipants;

      await message.react("🏁");

        const carImageStream = await axios.get(winningCar.image, { responseType: "stream" });


        const raceAwaitMessage = await message.reply({
            body: "🏁 𝗧𝗵𝗲 𝗿𝗮𝗰𝗲 𝗵𝗮𝘀 𝗯𝗲𝗴𝘂𝗻... 🏁",
            attachment: (await axios.get("https://i.imgur.com/6weZuXB.gif", { responseType: "stream" })).data,
        });

    await message.react("🏁");

        setTimeout(async () => {
            try {

                await global.api.unsendMessage(raceAwaitMessage.messageID);
                pendingRaces.delete(threadID);
                await Users.increaseMoney(winner.userID, winningAmount);
                const winnerName = await Users.getName(winner.userID);
                message.send({
                    body: `𝗖𝗔𝗥 𝗥𝗔𝗖𝗘 𝗥𝗘𝗦𝗨𝗟𝗧🎖️:\n━━━━━━━━━━━━━\n\n🏆  Winner: ${winnerName}\n🏎️  Car: ${winningCar.name}\n💰  Winning Amount: ${winningAmount} 💵\n━━━━━━━━━━━━━\n[Game created by: 𝗗𝘂𝗸𝗲 𝗔𝗴𝘂𝘀𝘁𝗶𝗻]`,
                    attachment: carImageStream.data,
                });
            } catch (error) {
                console.error("Error while unsending race-await message or sending race result:", error);
            }
        }, 11000);

        return; 
    }

  if (args[0] === "cancel") {
      const pendingRace = pendingRaces.get(threadID);

      if (!pendingRace || pendingRace.host !== senderID) {
          return message.reply("You are not the host of the pending race or there is no pending race in this thread.");
      }

      const refundAmount = pendingRace.betAmount * pendingRace.participants.length;

      for (const participant of pendingRace.participants) {
          await Users.increaseMoney(participant.userID, pendingRace.betAmount);
      }

      pendingRaces.delete(threadID);

      return message.reply(`Race canceled! Participants have been refunded ${pendingRace.betAmount} credits each.`);
  }

if (args.length === 0 || args[0] === "introduction") {
    const introductionMessage = getLang("car.introduction");
    const introductionImageURL = "https://i.imgur.com/Cve65Je.jpg"; 
    const introductionImageResponse = await axios.get(introductionImageURL, {
      responseType: "stream"
    });

    return message.reply({
      body: introductionMessage,
      attachment: introductionImageResponse.data
    });
  }

if (args[0] === "buy") {
  const carNameArg = args[1];
  const selectedCar = carData.find(car => car.name.toLowerCase() === carNameArg.toLowerCase());

  if (!selectedCar) {
    return message.reply("𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚌𝚊𝚛 𝚗𝚊𝚖𝚎.");
  }

  const userCurrentBalance = await Users.getMoney(senderID);

  if (userCurrentBalance < selectedCar.price) {
    return message.reply("『👨🏻‍💼』\n𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚑𝚊𝚟𝚎 𝚎𝚗𝚘𝚞𝚐𝚑 𝚖𝚘𝚗𝚎𝚢 𝚝𝚘 𝚋𝚞𝚢 𝚝𝚑𝚒𝚜 𝚌𝚊𝚛.");
  }

  const userCarList = userCars.get(senderID) || [];

  if (userCarList.length >= 4) {
    return message.reply("『👨🏻‍💼』\n𝚈𝚘𝚞 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚑𝚊𝚟𝚎 𝚝𝚑𝚎 𝚖𝚊𝚡𝚒𝚖𝚞𝚖 𝚗𝚞𝚖𝚋𝚎𝚛 𝚘𝚏 𝚌𝚊𝚛𝚜 𝚒𝚗 𝚢𝚘𝚞𝚛 𝚐𝚊𝚛𝚊𝚐𝚎.");
  }

  const lastPurchaseTime = userCarList.reduce((latestTime, car) => Math.max(latestTime, car.purchaseTime || 0), 0);
  const currentTime = Date.now();

  if (currentTime - lastPurchaseTime < BUY_COOLDOWN_DURATION) {
    const remainingCooldown = BUY_COOLDOWN_DURATION - (currentTime - lastPurchaseTime);
    const remainingCooldownHours = Math.floor(remainingCooldown / (60 * 60 * 1000));
    const remainingCooldownMinutes = Math.ceil((remainingCooldown % (60 * 60 * 1000)) / (60 * 1000));

    return message.reply(`『👨🏻‍💼』\n𝚈𝚘𝚞 𝚌𝚊𝚗 𝚋𝚞𝚢 𝚊𝚗𝚘𝚝𝚑𝚎𝚛 𝚌𝚊𝚛 𝚒𝚗 ${remainingCooldownHours} 𝚑𝚘𝚞𝚛𝚜 𝚊𝚗𝚍 ${remainingCooldownMinutes} 𝚖𝚒𝚗𝚞𝚝𝚎𝚜.`);
  }

  const imageResponse = await axios.get(selectedCar.image, {
    responseType: "stream"
  });

  const newBalance = userCurrentBalance - selectedCar.price;

  if (!userCarList.some(car => car.name === selectedCar.name)) {
    userCarList.push({ name: selectedCar.name, price: selectedCar.price, purchaseTime: currentTime });
    userCars.set(senderID, userCarList);
    saveUserCars();
    await Users.decreaseMoney(senderID, selectedCar.price);

    const buySuccessMessage = getLang("car.buySuccess")
      .replace("{carName}", selectedCar.name)
      .replace("{carPrice}", selectedCar.price)
      .replace("{newBalance}", newBalance);

    return message.reply({
      body: buySuccessMessage,
      attachment: imageResponse.data
    });
  } else {
    return message.reply("『👨🏻‍💼』\n𝚈𝚘𝚞 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚘𝚠𝚗 𝚝𝚑𝚒𝚜 𝚌𝚊𝚛.");
  }
}

if (args[0] === "duke") {

  if (!adminUserIds.includes(senderID)) {
    return message.reply('𝙾𝚗𝚕𝚢 𝙳𝚞𝚔𝚎 𝙰𝚐𝚞𝚜𝚝𝚒𝚗 𝚑𝚊𝚟𝚎 𝚝𝚑𝚎 𝚊𝚌𝚌𝚎𝚜𝚜 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
  }
  const carNameArg = args[1];
  const selectedCar = carData.find(car => car.name.toLowerCase() === carNameArg.toLowerCase());

  if (!selectedCar) {
    return message.reply("𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚌𝚊𝚛 𝚗𝚊𝚖𝚎.");
  }

  const userCurrentBalance = await Users.getMoney(senderID);

  if (userCurrentBalance < selectedCar.price) {
    return message.reply("『👨🏻‍💼』\n𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚑𝚊𝚟𝚎 𝚎𝚗𝚘𝚞𝚐𝚑 𝚖𝚘𝚗𝚎𝚢 𝚝𝚘 𝚋𝚞𝚢 𝚝𝚑𝚒𝚜 𝚌𝚊𝚛.");
  }

  const userCarList = userCars.get(senderID) || [];

  if (userCarList.length >= 50) {
    return message.reply("『👨🏻‍💼』\n𝚈𝚘𝚞 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚑𝚊𝚟𝚎 𝚝𝚑𝚎 𝚖𝚊𝚡𝚒𝚖𝚞𝚖 𝚗𝚞𝚖𝚋𝚎𝚛 𝚘𝚏 𝚌𝚊𝚛𝚜 𝚒𝚗 𝚢𝚘𝚞𝚛 𝚐𝚊𝚛𝚊𝚐𝚎.");
  }

  const imageResponse = await axios.get(selectedCar.image, {
    responseType: "stream"
  });

  const currentTime = Date.now(); 

  const newBalance = userCurrentBalance - selectedCar.price;

  if (!userCarList.some(car => car.name === selectedCar.name)) {
    userCarList.push({ name: selectedCar.name, price: selectedCar.price, purchaseTime: currentTime });
    userCars.set(senderID, userCarList);
    saveUserCars();
    await Users.decreaseMoney(senderID, selectedCar.price);

    const buySuccessMessage = getLang("car.buySuccess")
      .replace("{carName}", selectedCar.name)
      .replace("{carPrice}", selectedCar.price)
      .replace("{newBalance}", newBalance);

    return message.reply({
      body: buySuccessMessage,
      attachment: imageResponse.data
    });
  } else {
    return message.reply("『👨🏻‍💼』\n𝚈𝚘𝚞 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚘𝚠𝚗 𝚝𝚑𝚒𝚜 𝚌𝚊𝚛.");
  }
}

if (args[0] === "dragrace") {
  const userCarName = args[1];
  const betAmount = parseInt(args[2]);


  const cooldownTime = 5 * 60 * 1000; 
  const lastRaceTime = raceCooldowns.get(senderID) || 0;
  const timeSinceLastRace = Date.now() - lastRaceTime;

  if (timeSinceLastRace < cooldownTime) {
    const remainingCooldown = Math.ceil((cooldownTime - timeSinceLastRace) / 1000);
    return message.reply(`𝚈𝚘𝚞𝚛 𝚕𝚊𝚜𝚝 𝚛𝚊𝚌𝚎 𝚜𝚝𝚒𝚕𝚕 𝚌𝚕𝚎𝚊𝚗𝚒𝚗𝚐 𝚞𝚙. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝 ${remainingCooldown} 𝚜𝚎𝚌𝚘𝚗𝚍𝚜 𝚋𝚎𝚏𝚘𝚛𝚎 𝚛𝚊𝚌𝚒𝚗𝚐 𝚊𝚐𝚊𝚒𝚗`);
  }

  if (!userCarName || isNaN(betAmount) || betAmount < 1000000000000) {
    return message.reply("𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚒𝚗𝚙𝚞𝚝. 𝙼𝚒𝚗𝚒𝚖𝚞𝚖 𝚋𝚎𝚝 𝚏𝚘𝚛 𝚍𝚛𝚊𝚐 𝚛𝚊𝚌𝚎 𝚒𝚜 1,000,000,000,000.");
  }

  const userCar = userCars.get(senderID).find(car => car.name.toLowerCase() === userCarName.toLowerCase());

  if (!userCar) {
    return message.reply("𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚘𝚠𝚗 𝚝𝚑𝚎 𝚜𝚙𝚎𝚌𝚒𝚏𝚒𝚎𝚍 𝚌𝚊𝚛.");
  }

  const userCurrentBalance = await Users.getMoney(senderID);

  if (userCurrentBalance < betAmount) {
    return message.reply("𝙸𝚗𝚜𝚞𝚏𝚏𝚒𝚌𝚒𝚎𝚗𝚝 𝚋𝚊𝚕𝚊𝚗𝚌𝚎 𝚝𝚘 𝚙𝚕𝚊𝚌𝚎 𝚝𝚑𝚎 𝚋𝚎𝚝.");
  }


  const dragRaceCars = carData.concat(carData);

  const opponentCars = dragRaceCars.filter(car => car.name !== userCar.name);
  const opponentCar = opponentCars[Math.floor(Math.random() * opponentCars.length)]; 


  const userTime = 8 + Math.random() * 2;
  const opponentTime = 8 + Math.random() * 2;


  const userWins = userTime < opponentTime;
  const isTie = userTime === opponentTime;


  let resultMessage = '';

  if (isTie) {

    resultMessage = `𝐃𝐫𝐚𝐠 𝐑𝐚𝐜𝐞 𝐑𝐞𝐬𝐮𝐥𝐭 🏁:\nIt's a tie! Both ${userCar.name} and ${opponentCar.name} finished in ${userTime.toFixed(2)} seconds.\n\n𝙽𝚘 𝚠𝚒𝚗𝚗𝚎𝚛𝚜 𝚘𝚛 𝚕𝚘𝚜𝚎𝚛𝚜, 𝚝𝚑𝚎 𝚋𝚎𝚝 𝚛𝚎𝚖𝚊𝚒𝚗𝚜 𝚞𝚗𝚌𝚑𝚊𝚗𝚐𝚎𝚍.`;
  } else if (userWins) {

    resultMessage = `𝐃𝐫𝐚𝐠 𝐑𝐚𝐜𝐞 𝐑𝐞𝐬𝐮𝐥𝐭 🏁:\n𝚈𝚘𝚞𝚛 ${userCar.name} 𝚏𝚒𝚗𝚒𝚜𝚑𝚎𝚍 𝚒𝚗 ${userTime.toFixed(2)} 𝚜𝚎𝚌𝚘𝚗𝚍𝚜!\n𝙾𝚙𝚙𝚘𝚗𝚎𝚗𝚝'𝚜 ${opponentCar.name} 𝚏𝚒𝚗𝚒𝚜𝚑𝚎𝚍 𝚒𝚗 ${opponentTime.toFixed(2)} 𝚜𝚎𝚌𝚘𝚗𝚍𝚜!\n\n𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬, 𝚢𝚘𝚞'𝚟𝚎 𝚠𝚘𝚗 $${betAmount}! 💰`;
    await Users.increaseMoney(senderID, betAmount);
  } else {

    resultMessage = `𝐃𝐫𝐚𝐠 𝐑𝐚𝐜𝐞 𝐑𝐞𝐬𝐮𝐥𝐭 🏁:\n𝚈𝚘𝚞𝚛 ${userCar.name} 𝚏𝚒𝚗𝚒𝚜𝚑𝚎𝚍 𝚒𝚗 ${userTime.toFixed(2)} 𝚜𝚎𝚌𝚘𝚗𝚍𝚜!\n𝙾𝚙𝚙𝚘𝚗𝚎𝚗𝚝'𝚜 ${opponentCar.name} 𝚏𝚒𝚗𝚒𝚜𝚑𝚎𝚍 𝚒𝚗 ${opponentTime.toFixed(2)} 𝚜𝚎𝚌𝚘𝚗𝚍𝚜!\n\n𝚄𝚗𝚏𝚘𝚛𝚝𝚞𝚗𝚊𝚝𝚎𝚕𝚢, 𝚢𝚘𝚞'𝚛𝚎 𝚕𝚘𝚜𝚝 $${betAmount}. 💸`;
    await Users.decreaseMoney(senderID, betAmount);
  }

  const userCarInfo = dragRaceCars.find(car => car.name === userCar.name);
  const opponentCarInfo = dragRaceCars.find(car => car.name === opponentCar.name);

  const attachmentStreams = [];
  const userCarImageResponse = await axios.get(userCarInfo.image, {
    responseType: "stream"
  });
  const opponentCarImageResponse = await axios.get(opponentCarInfo.image, {
    responseType: "stream"
  });

  attachmentStreams.push(userCarImageResponse.data);
  attachmentStreams.push(opponentCarImageResponse.data);

  const delayDuration = 7000; 
  const delayGifURL = "https://media.tenor.com/23Hso_j4PP0AAAAd/mexicandriver-drag-race.gif"; 


  const gifMessage = await message.reply({
    body: "𝚁𝚊𝚌𝚎 𝚒𝚜 𝚜𝚝𝚊𝚛𝚝𝚒𝚗𝚐... 🏁",
    attachment: (await axios.get(delayGifURL, { responseType: "stream" })).data
  });


  await new Promise(resolve => setTimeout(resolve, delayDuration));


  if (global.api && global.api.unsendMessage) {
    await global.api.unsendMessage(gifMessage.messageID);
  }
  raceCooldowns.set(senderID, Date.now());

  return message.reply({
    body: resultMessage,
    attachment: attachmentStreams
  });
}

if (args[0] === "available") {

  const sortedCars = carData.sort((carA, carB) => carB.price - carA.price);


  const availableCarsMessage = "𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐀𝐑𝐒:\n\n" +
    sortedCars.map(car => `✧ ${car.name}\n- $${car.price.toLocaleString()}\n━━━━━━━━━━━━━`).join("\n");

  return message.reply(availableCarsMessage);
}  

if (args[0] === "upgrade") {
  const userCarName = args[1];
  const userCarList = userCars.get(senderID) || [];
  const userCar = userCarList.find(car => car.name.toLowerCase() === userCarName.toLowerCase());

  let carInfo;

  if (userCar) {
    carInfo = carData.find(dataCar => dataCar.name === userCar.name) || carData.find(dataCar => dataCar.name === userCar.name);
  } else {
    carInfo = carData.find(dataCar => dataCar.name.toLowerCase() === userCarName.toLowerCase()) || carData.find(dataCar => dataCar.name.toLowerCase() === userCarName.toLowerCase());
  }

  if (!carInfo) {
    return message.reply("『👨🏻‍🔧』\nYou don't own a car with that name.");
  }

  const currentTime = Date.now();
  const lastUpgradeTime = userCar?.lastUpgradeTime || 0;

  if (currentTime - lastUpgradeTime < UPGRADE_COOLDOWN_DURATION) {
    const remainingCooldown = UPGRADE_COOLDOWN_DURATION - (currentTime - lastUpgradeTime);
    const remainingCooldownHours = Math.floor(remainingCooldown / (60 * 60 * 1000));
    const remainingCooldownMinutes = Math.ceil((remainingCooldown % (60 * 60 * 1000)) / (60 * 1000));

    return message.reply(`『👨🏻‍🔧』\nYou can upgrade your car again in ${remainingCooldownHours} hours and ${remainingCooldownMinutes} minutes.`);
  }

  const upgradeCost = 1000000000; 
  const userCurrentBalance = await Users.getMoney(senderID);

  if (userCurrentBalance < upgradeCost) {
    return message.reply("『👨🏻‍🔧』\nInsufficient funds to upgrade your car.");
  }


  await Users.decreaseMoney(senderID, upgradeCost);


  for (const userCar of userCarList) {
    userCar.price += upgradeCost;
    userCar.lastUpgradeTime = currentTime;
    userCar.upgradeCount = (userCar.upgradeCount || 0) + 1;
  }

  saveUserCars();

  const upgradedPrice = carInfo.price + userCar.upgradeCount * 1000000000;

  const upgradeMessage = `『👨🏻‍🔧』\nYou've upgraded your ${carInfo.name}!\n━━━━━━━━━━━━━\n` +
    `Number of Upgrades: ${userCar.upgradeCount}\n` +
    `New Price: $${upgradedPrice.toLocaleString()} 💵\n` +
    `Upgrade Cost: $${upgradeCost.toLocaleString()} 💵`;

  const imageResponse = await axios.get(carInfo.image, {
    responseType: "stream"
  });

  return message.reply({
    body: upgradeMessage,
    attachment: imageResponse.data
  });
}

if (args[0] === "upgradeall") {
  const userCarList = userCars.get(senderID) || [];

  if (userCarList.length === 0) {
    return message.reply("『👨🏻‍🔧』\nYou don't own any cars to upgrade.");
  }

  const currentTime = Date.now();
  const lastUpgradeTime = userCarList[0]?.lastUpgradeTime || 0;

  if (currentTime - lastUpgradeTime < UPGRADE_COOLDOWN_DURATION) {
    const remainingCooldown = UPGRADE_COOLDOWN_DURATION - (currentTime - lastUpgradeTime);
    const remainingCooldownHours = Math.floor(remainingCooldown / (60 * 60 * 1000));
    const remainingCooldownMinutes = Math.ceil((remainingCooldown % (60 * 60 * 1000)) / (60 * 1000));

    return message.reply(`『👨🏻‍🔧』\nYou can upgrade your cars again in ${remainingCooldownHours} hours and ${remainingCooldownMinutes} minutes.`);
  }

  const upgradeCost = 1000000000; 
  const userCurrentBalance = await Users.getMoney(senderID);

  if (userCurrentBalance < upgradeCost * userCarList.length) {
    return message.reply("『👨🏻‍🔧』\nInsufficient funds to upgrade all your cars.");
  }

  const attachmentStreams = [];
  const upgradeMessages = [];


  for (const userCar of userCarList) {
    userCar.price += upgradeCost;
    userCar.lastUpgradeTime = currentTime;
    userCar.upgradeCount = (userCar.upgradeCount || 0) + 1;

    const carInfo = carData.find(dataCar => dataCar.name === userCar.name) || carData.find(dataCar => dataCar.name === userCar.name);

    if (carInfo) {
      const upgrades = userCar.upgradeCount || 0;
      const upgradedPrice = carInfo.price + upgrades * 1000000000; 

      upgradeMessages.push(
        `⇒ ${carInfo.name} \n$${carInfo.price.toLocaleString()} 💵 \nNumber of Upgrades: ${upgrades} \nUpgraded Price: $${upgradedPrice.toLocaleString()} 💵\n━━━━━━━━━━━━━`
      );

      const imageResponse = await axios.get(carInfo.image, {
        responseType: "stream"
      });
      attachmentStreams.push(imageResponse.data);
    }
  }


  await Users.decreaseMoney(senderID, upgradeCost * userCarList.length);

  saveUserCars();


  return message.reply({
    body: upgradeMessages.join("\n"),
    attachment: attachmentStreams
  });
}

if (args[0] === "sell") {
  const carNameArg = args[1];

  if (!carNameArg) {
    return message.reply("『👨🏻‍💼』\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚝𝚑𝚎 𝚗𝚊𝚖𝚎 𝚘𝚏 𝚝𝚑𝚎 𝚌𝚊𝚛 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚜𝚎𝚕𝚕.");
  }

  const userCarList = userCars.get(senderID) || [];
  const selectedCar = userCarList.find(userCar => userCar.name.toLowerCase() === carNameArg.toLowerCase());

  let carInfo;

  if (selectedCar) {
    carInfo = carData.find(dataCar => dataCar.name === selectedCar.name) || carData.find(dataCar => dataCar.name === selectedCar.name);
  } else {
    carInfo = carData.find(dataCar => dataCar.name.toLowerCase() === carNameArg.toLowerCase()) || carData.find(dataCar => dataCar.name.toLowerCase() === carNameArg.toLowerCase());
  }

  if (!carInfo) {
    return message.reply("『👨🏻‍💼』\n𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚘𝚠𝚗 𝚊 𝚌𝚊𝚛 𝚠𝚒𝚝𝚑 𝚝𝚑𝚊𝚝 𝚗𝚊𝚖𝚎.");
  }


  const upgrades = selectedCar?.upgradeCount || 0;
  const sellingPrice = carInfo.price + upgrades * 1000000000;

  await Users.increaseMoney(senderID, sellingPrice);

  const updatedUserCarList = userCarList.filter(userCar => userCar.name !== selectedCar.name);
  userCars.set(senderID, updatedUserCarList);
  saveUserCars();

  return message.reply(`『👨🏻‍💼』\n𝚈𝚘𝚞 𝚑𝚊𝚟𝚎 𝚜𝚘𝚕𝚍 ${selectedCar.name} 𝚊𝚗𝚍 𝚛𝚎𝚌𝚎𝚒𝚟𝚎𝚍 $${sellingPrice} 💵.`);
}

if (args[0] === "inventory") {
  if (!userCars.has(senderID) || userCars.get(senderID).length === 0) {
    return message.reply("『👨🏻‍🔧』\n𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚑𝚊𝚟𝚎 𝚊𝚗𝚢 𝚌𝚊𝚛𝚜 𝚒𝚗 𝚢𝚘𝚞𝚛 𝚐𝚊𝚛𝚊𝚐𝚎.");
  }

  const userCarList = userCars.get(senderID);
  const attachmentStreams = [];
  const inventoryMessages = [];

  for (const userCar of userCarList) {
    const carInfo = carData.find(dataCar => dataCar.name === userCar.name) || carData.find(dataCar => dataCar.name === userCar.name);

    if (carInfo) {
      const upgrades = userCar.upgradeCount || 0;
      const upgradedPrice = carInfo.price + upgrades * 1000000000; 

      inventoryMessages.push(
        `⇒ ${carInfo.name} \n$${carInfo.price.toLocaleString()} 💵 \n𝚄𝚙𝚐𝚛𝚊𝚍𝚎𝚜: ${upgrades} \n𝚄𝚙𝚐𝚛𝚊𝚍𝚎𝚍 𝙿𝚛𝚒𝚌𝚎: $${upgradedPrice.toLocaleString()} 💵\n━━━━━━━━━━━━━`
      );

      const imageResponse = await axios.get(carInfo.image, {
        responseType: "stream"
      });
      attachmentStreams.push(imageResponse.data);
    }
  }


  await message.reply({
    body: inventoryMessages.join("\n"),
    attachment: attachmentStreams
  });

  return; 
}

if (args[0] === "check") {
  const carNameArg = args[1];

  if (!carNameArg) {
    return message.reply("𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚝𝚑𝚎 𝚗𝚊𝚖𝚎 𝚘𝚏 𝚝𝚑𝚎 𝚌𝚊𝚛 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚌𝚑𝚎𝚌𝚔.");
  }

  const userCarList = userCars.get(senderID) || [];
  const selectedCar = userCarList.find(userCar => userCar.name.toLowerCase() === carNameArg.toLowerCase());

  if (!selectedCar) {
    return message.reply("𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚘𝚠𝚗 𝚝𝚑𝚒𝚜 𝚌𝚊𝚛.");
  }

  const carInfo = carData.find(dataCar => dataCar.name === selectedCar.name) || carData.find(dataCar => dataCar.name === selectedCar.name);

  if (!carInfo) {
    return message.reply("𝙲𝚊𝚛 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍.");
  }

  const upgrades = selectedCar.upgradeCount || 0;
  const upgradedPrice = carInfo.price + upgrades * 1000000000; 

  const checkMessage = `𝙲𝚊𝚛 𝙽𝚊𝚖𝚎: ${carInfo.name}\n𝙾𝚛𝚒𝚐𝚒𝚗𝚊𝚕 𝙿𝚛𝚒𝚌𝚎: $${carInfo.price.toLocaleString()} 💵\n𝚄𝚙𝚐𝚛𝚊𝚍𝚎𝚜: ${upgrades}\n𝚄𝚙𝚐𝚛𝚊𝚍𝚎𝚍 𝙿𝚛𝚒𝚌𝚎: $${upgradedPrice.toLocaleString()} 💵`;

  const imageResponse = await axios.get(carInfo.image, {
    responseType: "stream"
  });

  return message.reply({
    body: checkMessage,
    attachment: imageResponse.data
  });
}

if (args[0] === "transfer") {
    const targetUserID = args[1];
    const carNameArg = args.slice(2).join(" ");

    if (!targetUserID || !carNameArg) {
      return message.reply("Please provide a valid target user ID and the name of the car you want to transfer.");
    }


    loadUserCars();

    const senderCarList = userCars.get(senderID) || [];
    const targetCarList = userCars.get(targetUserID) || [];



    const selectedCarIndex = senderCarList.findIndex(userCar => userCar.name.toLowerCase() === carNameArg.toLowerCase());

    if (selectedCarIndex === -1) {
      return message.reply("You don't own this car.");
    }

    const selectedCar = senderCarList[selectedCarIndex];

    if (targetCarList.length >= 4) {
      return message.reply("『👨🏻‍💼』\nThe target user already has the maximum number of cars in their garage.");
    }

    if (senderID === targetUserID) {
      return message.reply("『👨🏻‍💼』\nYou cannot transfer a car to yourself.");
    }


    if (targetCarList.some(userCar => userCar.name.toLowerCase() === carNameArg.toLowerCase())) {
      return message.reply(`『👨🏻‍💼』\nTarget user already owns the ${carNameArg}.`);
    }


    const transferCost = 250000000000;

    if (await Users.getMoney(senderID) < transferCost) {
      return message.reply("『👨🏻‍💼』\nYou don't have enough money to cover the transfer cost.");
    }


    senderCarList.splice(selectedCarIndex, 1);
    targetCarList.push(selectedCar);

    userCars.set(senderID, senderCarList);
    userCars.set(targetUserID, targetCarList);

    saveUserCars();


    await Users.decreaseMoney(senderID, transferCost);
    await Users.decreaseMoney(targetUserID, transferCost);

    return message.reply(`『👨🏻‍💼』\nYou have successfully transferred your ${carNameArg} to your target user. Both you and the target have been charged $ ${transferCost.toLocaleString()} for the transfer.`);
  }


const introductionMessage = getLang("car.introduction");
const introductionImageURL = "https://i.imgur.com/Cve65Je.jpg"; 
const introductionImageResponse = await axios.get(introductionImageURL, {
  responseType: "stream"
});

return message.reply({
  body: introductionMessage,
  attachment: introductionImageResponse.data
});
}


export default {
  config,
  langData,
  onCall
};