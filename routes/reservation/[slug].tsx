import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../../components/NavBar.tsx';
import { Account, Context } from '../../type.ts';
import AccountModel from '../../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import ReservationStepper from '../../islands/Reservation-Stepper.tsx';
import SpotModel, { Spot } from '../../models/spot.ts';

export const handler: Handlers<Context & { spot: Spot }> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		const { slug } = ctx.params;

		const spot = await SpotModel.findBySlug(slug);

		return ctx.render({ user, path: url.pathname, spot: spot! });
	},
	// async POST(req, ctx) {
	// 	const cookies = getCookies(req.headers);
	// 	let user: Account | undefined | null = undefined;
	// 	if (cookies.user) {
	// 		user = await AccountModel.findById(parseInt(cookies.user, 10));
	// 	}
	// 	const url = new URL(req.url);
	// 	return ctx.render({ user, path: url.pathname });
	// },
};

export default function Home(props: PageProps<Context & { spot: Spot }>) {
	const data = props.data || {};

	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<NavBar user={data.user} path={data.path} />
				<ReservationStepper spot={data.spot} />
				<script src='/js/flowbite.js' />
			</body>
		</>
	);
}
