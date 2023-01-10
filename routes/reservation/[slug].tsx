import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../../components/NavBar.tsx';
import { Account, Context } from '../../type.ts';
import AccountModel from '../../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import ReservationStepper from '../../islands/Reservation-Stepper.tsx';
import spots from '../../models/spot.ts';

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

export default function Home(props: PageProps<Context>) {
	const data = props.data || {};
	const spot = spots.find((index) => index.slug === props.params.slug);

	return (
		<>
			<Head>
				<title>TACROS</title>
			</Head>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<NavBar user={data.user} path={data.path} />
				<ReservationStepper spot={spot} />
				<script src='/js/flowbite.js' />
			</body>
		</>
	);
}
