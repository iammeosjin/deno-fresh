import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import ReservationStepper from '../islands/Reservation-Stepper.tsx';

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

export default function Home({ data }: PageProps<Context>) {
	const props = data || {};

	return (
		<>
			<Head>
				<title>TACROS</title>
			</Head>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<NavBar user={props.user} path={props.path} />
				<ReservationStepper />
				<script src='js/flowbite.js' />
			</body>
		</>
	);
}