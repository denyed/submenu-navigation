import 'dotenv/config';

import { Bot } from 'grammy';
import { StartMenu } from 'menus';
import { Ctx } from 'types/context';

const bot = new Bot<Ctx>(process.env.TELEGRAM_TOKEN!);

bot.use(StartMenu);

bot.command('start', (ctx) =>
	ctx.reply('This is an example menu!', {
		reply_markup: StartMenu
	})
);

bot.start({ drop_pending_updates: true });
