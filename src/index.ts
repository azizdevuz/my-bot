import { Telegraf } from "telegraf";
import { about } from "./commands";
import { greeting } from "./text";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { development, production } from "./core";

require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ENVIRONMENT = process.env.NODE_ENV || "";

const bot = new Telegraf(BOT_TOKEN);

bot.command("about", about());
bot.on("message", greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  let ress = await production(req, res, bot);
  console.log(ress);
};
//dev mode
ENVIRONMENT !== "production" && development(bot);
