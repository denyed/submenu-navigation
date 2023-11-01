import { Menu } from '@grammyjs/menu';
import { Ctx } from 'types/context';
import { Items } from 'types/constants';

export const StartMenu = new Menu<Ctx>('start-menu').submenu('View Items', 'view-items-menu');

const ViewItemsMenu = new Menu<Ctx>('view-items-menu').dynamic((ctx, range) => {
	const page = Number(ctx.match) || 0;
	const start = page * 10;
	const end = start + 10;

	for (let i = start; i < Math.min(end, Items.length); i++) {
		range.text({ text: Items[i], payload: String(page) }, (ctx) => ctx.reply(`You selected ${Items[i]}!`));
		if (i % 2) range.row();
	}

	range.row();

	if (page > 0) range.text({ text: '<<', payload: String(page - 1) }, (ctx) => ctx.menu.update());
	range.text({ text: 'Cancel', payload: String(page) }, (ctx) => ctx.deleteMessage());
	if (page < Math.ceil(Items.length / 10) - 1) range.text({ text: '>>', payload: String(page + 1) }, (ctx) => ctx.menu.update());
});

StartMenu.register(ViewItemsMenu);
