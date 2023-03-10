import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import NavBar from '../../components/NavBar.tsx';
import { Account, Context } from '../../type.ts';
import AccountModel from '../../models/account.ts';
import SpotModel, { Spot } from '../../models/spot.ts';

import Place from '../../islands/Place.tsx';

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
};

export default function Places(
	props: PageProps<Context & { spot: Spot }>,
) {
	const data = props.data || {};
	const { spot } = data;

	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<link rel='stylesheet' href='/css/swiper-bundle.min.css' />
				<NavBar user={data.user} path={data.path} />
				<Place spot={spot} />
				<script src='/js/flowbite.js' />
				<script src='/js/swiper-bundle.min.js' />
				<script src='/js/swiper.js' />
			</body>
		</>
	);
}
