import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Barangay, Category, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import { Button } from '../components/Button.tsx';
import { Head } from '../components/Head.tsx';
import AddPlace from '../islands/Add-Place.tsx';
import Receipt from '../islands/Receipt.tsx';

function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		},
	);
}

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
			<Head>
				<title>
					Jasaan Tourist Association Center Reservation Online System
				</title>
			</Head>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<NavBar user={data.user} path={data.path} />
				<Receipt />
				<script src='js/flowbite.js' />
			</body>
		</>
	);
}
