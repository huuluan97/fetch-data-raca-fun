const TelegramBot = require("node-telegram-bot-api");
const StateMachine = require("javascript-state-machine");
const axios = require("axios").default;
const moment = require("moment");

const httpClient = axios.create({
  baseURL: "https://market-api.radiocaca.com/nft-sales",
});

// function createFsm() {
//   return StateMachine.create({
//     initial: "waitingstart",
//     final: "final",
//     events: [
//       { name: "gotstart", from: "waitingstart", to: "waitingname" },
//       { name: "gotname", from: "waitingname", to: "echoing" },
//       { name: "gottext", from: "echoing", to: "echoing" },
//       { name: "gotstop", from: "echoing", to: "confirm" },
//       { name: "confirmed", from: "confirm", to: "final" },
//       { name: "cancelled", from: "confirm", to: "echoing" },
//       { name: "invalid", from: "confirm", to: "confirm" },
//     ],
//   });
// }

function eventFromStateAndMessageText(state, text) {
  switch (state) {
    case "waitingstart":
      return text === "/start" && "gotstart";
      break;
    case "waitingname":
      return "gotname";
      break;
    case "echoing":
      return text === "/stop" ? "gotstop" : "gottext";
      break;
    case "confirm":
      if (text === "yes") {
        return "confirmed";
      } else if (text === "no") {
        return "cancelled";
      } else {
        return "invalid";
      }
  }
}

class Bot {
  constructor(token) {
    this.client = new TelegramBot(token, { polling: true });
  }

  start() {
    this.client.on("message", (message) => {
      if (!message.reply_to_message) {
        this.respondTo(message);
      }
    });
  }

  fetchDataRacaPunk() {
    return new Promise(function (resolve, reject) {
      httpClient
        .get(
          "?pageNo=1&pageSize=20&sortBy=fixed_price&order=asc&name=&saleType&category=28&tokenType&tokenId=-1"
        )
        .then((response) => {
          const { data } = response;
          const { list, total } = data;
          const dataResponse = {
            name: list[0].name,
            priceLowest: list[0].fixed_price,
            total,
          };
          resolve(dataResponse);
        })
        .catch((err) => reject(err));
    });
  }

  fetchDataRacaEgg() {
    return new Promise(function (resolve, reject) {
      httpClient
        .get(
          "?pageNo=1&pageSize=20&sortBy=fixed_price&name=&order=asc&saleType&category=17&tokenType&tokenId=-1"
        )
        .then((response) => {
          const { data } = response;
          const { list, total } = data;
          const dataResponse = {
            name: list[0].name,
            priceLowest: list[0].fixed_price,
            total,
          };
          resolve(dataResponse);
        })
        .catch((err) => reject(err));
    });
  }

  fetchDataRacaDragonFruitDog() {
    return new Promise(function (resolve, reject) {
      httpClient
        .get(
          "?pageNo=1&pageSize=20&sortBy=fixed_price&order=asc&name=&saleType&category=26&tokenType&tokenId=-1"
        )
        .then((response) => {
          const { data } = response;
          const { list, total } = data;
          const dataResponse = {
            name: list[0].name,
            priceLowest: list[0].fixed_price,
            total,
          };
          resolve(dataResponse);
        })
        .catch((err) => reject(err));
    });
  }

  fetchDataRacaPotion() {
    return new Promise(function (resolve, reject) {
      httpClient
        .get(
          "?pageNo=1&pageSize=20&sortBy=fixed_price&order=asc&name=&saleType&category=15&tokenType&tokenId=-1"
        )
        .then((response) => {
          const { data } = response;
          const { list, total } = data;
          const dataResponse = {
            name: list[0].name,
            priceLowest: list[0].fixed_price,
            total,
          };
          resolve(dataResponse);
        })
        .catch((err) => reject(err));
    });
  }

  fetchDataRacaMetamon() {
    return new Promise(function (resolve, reject) {
      httpClient
        .get(
          "?pageNo=1&pageSize=20&sortBy=fixed_price&order=asc&name=&saleType&category=13&tokenType&tokenId=-1"
        )
        .then((response) => {
          const { data } = response;
          const { list, total } = data;
          const dataResponse = {
            name: list[0].name,
            priceLowest: list[0].fixed_price,
            total,
          };
          resolve(dataResponse);
        })
        .catch((err) => reject(err));
    });
  }

  // fetchListDataMetamon(number) {
  //   let pageSize = parseInt(number.substring(4).trim());
  //   if (pageSize && typeof pageSize === "number") {
  //     return new Promise(function (resolve, reject) {
  //       httpClient
  //         .get(
  //           `?pageNo=1&pageSize=${pageSize}&sortBy=fixed_price&order=asc&name=&saleType&category=13&tokenType&tokenId=-1`
  //         )
  //         .then((response) => {
  //           const { data } = response;
  //           const { list, total } = data;
  //           list.map((item, index) => {
  //             return new Promise(function (resolve, reject) {
  //               httpClient
  //                 .get(`/${item.id}`)
  //                 .then((responseDetail) => {
  //                   item.fixed_price = responseDetail.data.fixed_price;
  //                   item.properties = responseDetail.data.properties;
  //                 })
  //                 .catch((err) => reject(err));
  //             });
  //           });
  //           console.log(list);
  //           resolve();
  //         })
  //         .catch((err) => reject(err));
  //     });
  //   }
  // }

  async respondTo(message) {
    //let fsm = createFsm();
    const { text, from, chat, message_id, entities } = message;

    if (text === "/raca") {
      const punks = await this.fetchDataRacaPunk();
      const eggs = await this.fetchDataRacaEgg();
      const dogs = await this.fetchDataRacaDragonFruitDog();
      const potions = await this.fetchDataRacaPotion();
      const metamon = await this.fetchDataRacaMetamon();
      this.client.sendMessage(
        message.chat.id,
        `
Prices NFT Raca ${moment().format("DD/MM/YYYY hh:mm:ss")}
• Name: Eggs - Lowest Price: ${eggs.priceLowest} Raca - Total: ${eggs.total}
• Name: Raca Punk - Lowest Price: ${punks.priceLowest} Raca - Total: ${
          punks.total
        }
• Name: Dragon Fruit Dog - Lowest Price: ${dogs.priceLowest} Raca - Total: ${
          dogs.total
        }
• Name: Potion - Lowest Price: ${potions.priceLowest} Raca - Total: ${
          potions.total
        }
• Name: Metamon - Lowest Price: ${metamon.priceLowest} Raca - Total: ${
          metamon.total
        }
        `
      );
    }

    if (text === "/report") {
      this.client.sendMessage(message.chat.id, "Raca Scam");
    }

    // if (text.includes("/mtm")) {
    //   //const metamonCount = await this.fetchListDataMetamon(text);
    //   this.client.sendMessage(message.chat.id, "Raca Scam");
    // }

    // fsm.ongotstart = () => {
    //   lastMessage = this.client.sendMessage(
    //     message.chat.id,
    //     "Let's begin! What's your name?",
    //     { reply_markup: JSON.stringify({ force_reply: true }) }
    //   );
    // };

    // fsm.ongotname = (event, from, to, message) => {
    //   name = message.text;
    //   lastMessage = this.client.sendMessage(
    //     message.chat.id,
    //     `Got it ${name}, I'll begin echoing your replies until you respond with /stop`,
    //     { reply_markup: JSON.stringify({ force_reply: true }) }
    //   );
    // };

    // fsm.ongottext = (event, from, to, message) => {
    //   lastMessage = this.client.sendMessage(
    //     message.chat.id,
    //     `Echoing for ${name}: ${message.text}`,
    //     { reply_markup: JSON.stringify({ force_reply: true }) }
    //   );
    // };

    // fsm.ongotstop = () => {
    //   lastMessage = this.client.sendMessage(
    //     message.chat.id,
    //     "Are you sure you want to stop? (yes/no)",
    //     { reply_markup: JSON.stringify({ force_reply: true }) }
    //   );
    // };

    // fsm.onconfirmed = () => {
    //   lastMessage = this.client.sendMessage(
    //     message.chat.id,
    //     "We're done here, see ya!"
    //   );
    // };

    // fsm.oncancelled = () => {
    //   lastMessage = this.client.sendMessage(
    //     message.chat.id,
    //     "Alright, going back to echoing",
    //     { reply_markup: JSON.stringify({ force_reply: true }) }
    //   );
    // };

    // fsm.oninvalid = () => {
    //   lastMessage = this.client.sendMessage(
    //     message.chat.id,
    //     "Sorry, I didn't catch that, do you want to cancel? (yes/no)",
    //     { reply_markup: JSON.stringify({ force_reply: true }) }
    //   );
    // };

    // while (!fsm.isFinished()) {
    //   let text = lastReply.text;
    //   let event = eventFromStateAndMessageText(fsm.current, text);

    //   if (!event || fsm.cannot(event)) {
    //     this.client.sendMessage(
    //       message.chat.id,
    //       "I wasn't expecting that, try /start"
    //     );
    //     break;
    //   }

    //   fsm[event](lastReply);

    //   let sentMessage = await lastMessage;
    //   lastReply = await new Promise((resolve) =>
    //     this.client.onReplyToMessage(
    //       sentMessage.chat.id,
    //       sentMessage.message_id,
    //       resolve
    //     )
    //   );
    // }
  }
}

module.exports = { Bot };
