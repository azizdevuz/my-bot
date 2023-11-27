import { VercelRequest, VercelResponse } from "@vercel/node";
import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

require("dotenv").config();

const VERCEL_URL = `${process.env.VERCEL_URL}`;

const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: Telegraf<Context<Update>>
) => {
  if (!VERCEL_URL) {
    throw new Error("VERCEL_URL is not set.");
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo();
  if (getWebhookInfo.url !== VERCEL_URL + "/api") {
    await bot.telegram.deleteWebhook();
    await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
  }

  if (req.method === "POST") {
    let data = await bot.handleUpdate((req.body as unknown) as Update, res);
    console.log(data);
    res.status(200).json(data);
  } else {
    res.status(200).json({
      ok: true,
      message: "Listening ...",
      url: VERCEL_URL,
      info: getWebhookInfo,
    });
  }
};
export { production };
