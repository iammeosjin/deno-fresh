import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Barangay, Category, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import AddPlace from '../islands/Add-Place.tsx';

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
};

export default function Places(
	props: PageProps<Context>,
) {
	const data = props.data || {};

	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<link rel='stylesheet' href='/css/slider.css' />
				<NavBar user={data.user} path={data.path} />
				<AddPlace />
				<script src='/js/flowbite.js' />
				<script src='/js/slider.js' />
			</body>
		</>
	);
}
