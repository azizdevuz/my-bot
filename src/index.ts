import { Telegraf } from "telegraf";
import { about } from "./commands";
import { greeting } from "./text";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { development, production } from "./core";

require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN || "6250377643:AAEzRDo_itX_9-oU_Soj-i22dHNk7Am3vi8";
const ENVIRONMENT = process.env.NODE_ENV || "";

const bot = new Telegraf(BOT_TOKEN);

bot.command("about", about());
bot.on("message", greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== "production" && development(bot);
