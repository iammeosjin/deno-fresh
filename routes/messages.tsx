import { Handlers, PageProps } from '$fresh/server.ts';

import NavBar from '../components/NavBar.tsx';
import { Account, Context, Message } from '../type.ts';
import AccountModel from '../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import { ComponentChildren } from 'preact';
import { Head } from '../components/Head.tsx';
import Messages from '../islands/Messages.tsx';
import MessageModel from '../models/message.ts';

export const handler: Handlers<Context & { messages: Message[] }> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		const messages = await MessageModel.find();

		return ctx.render({ user, path: url.pathname, messages });
	},
	async POST(req) {
		const body = await req.json();

		await MessageModel.create({
			name: body.name,
			email: body.email,
			message: body.message,
		});

		return new Response(null, {
			status: 200, // "See Other"
		});
	},
	async DELETE(req) {
		const body = await req.json();

		await MessageModel.delete(body.id);

		return new Response(null, {
			status: 200, // "See Other"
		});
	},
};

export default function Home(
	props: PageProps<Context & { messages: Message[] }> & {
		children: ComponentChildren;
	},
) {
	const data = props.data || {};

	return (
		<>
			<Head>
				<title>
					Jasaan Tourist Association Center Reservation Online System
				</title>
			</Head>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<NavBar user={data.user} path={data.path} />
				<Messages messages={data.messages} />
				<script src='js/flowbite.js' />
			</body>
		</>
	);
}
