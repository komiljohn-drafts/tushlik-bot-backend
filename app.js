const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const TOKEN = "5764027425:AAGiR6mZ_z-zzBqySkVTgsk8b5BNdy-flVo";

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === "/start") {
    bot.sendMessage(chatId, "Test text");
  }
});

app.post("/register/", async (req, res) => {
  console.log("REQUEST => ", req);
  const { categories, queryId, values } = req;
  try {
    await bot.answerWebAppQuery(
      queryId,
      JSON.stringify({
        type: "article",
        id: queryId,
        title: "Tabriklaymiz!",
        input_message_content: {
          message_text: `Sizning buyurtmangiz \n ${categories
            .map((i) => `${i.title} - ${i.count * i.price} \n`)
            .join(" ")}`,
        },
      })
    );
  } catch (error) {
    await bot.answerWebAppQuery(
      queryId,
      JSON.stringify({
        type: "article",
        id: queryId,
        title: "Omadsizlik!",
        input_message_content: {
          message_text: "Sizning buyurtmangiz qabul qilinmadi",
        },
      })
    );
  }

  res.send("success");
});

app.listen(8000, () => console.log("The server is up on port 3000"));
