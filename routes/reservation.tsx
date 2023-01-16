import { Handlers, PageProps } from '$fresh/server.ts';

import NavBar from '../components/NavBar.tsx';
import { Account, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import ReservationStepper from '../islands/Reservation-Stepper.tsx';
import { ComponentChildren } from 'preact';
import { Head } from '../components/Head.tsx';

export const handler: Handlers<Context> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		return ctx.render({ user, path: url.pathname });
	},

	async POST(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);
		return ctx.render({ user, path: url.pathname });
	},
};

export default function Home(
	props: PageProps<Context> & { children: ComponentChildren },
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
				<ReservationStepper spot={undefined} />
				<script src='js/flowbite.js' />
			</body>
		</>
	);
}
