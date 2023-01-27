// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import SpotModel from '../models/spot.ts';
import Places from '../islands/Places.tsx';
import { PostListProps } from '../components/PostList.tsx';

export const handler: Handlers<
	Context & { type: string; spots: PostListProps[] }
> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		let type = url.searchParams.get('type');
		if (!type || (type !== 'resort' && type !== 'tourist_spot')) {
			const headers = new Headers(req.headers);
			headers.set('location', '/404');
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			});
		}

		type = type.toUpperCase();

		const spots = await SpotModel.find({
			filter: { type: type as any },
		});

		return ctx.render({
			user,
			path: url.pathname,
			type,
			spots,
		});
	},
};

export default function spots(
	props: PageProps<
		Context & { type: 'RESORT' | 'TOURIST_SPOT'; spots: PostListProps[] }
	>,
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
				<link rel='stylesheet' href='css/floating-button.css' />
				<NavBar user={data.user} path={data.path} />
				<Places type={data.type} spots={data.spots} />
				<script src='/js/flowbite.js' />
			</body>
		</>
	);
}
