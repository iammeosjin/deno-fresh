import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context, Post } from '../type.ts';
import AccountModel from '../models/account.ts';
import spots from '../models/spot.ts';
import { getCookies } from 'std/http/cookie.ts';
import Posts from '../islands/Posts.tsx';
import PostModel from '../models/post.ts';
import Spots from '../islands/Spots.tsx';
import chance from '../lib/chance.ts';
import { PostListProps } from '../components/PostList.tsx';

export const handler: Handlers<
	Context & { posts: Post[]; spots: PostListProps[] }
> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		const posts = await PostModel.find();
		const search = url.searchParams.get('search');

		return ctx.render({
			user,
			spots: search
				? spots.filter((spot) =>
					spot.search.includes(search.toLowerCase())
				)
				: spots,
			path: url.pathname,
			posts: chance.shuffle([
				...posts,
				...posts,
			]),
		});
	},
};

export default function Home(
	{ data }: PageProps<Context & { posts: Post[]; spots: PostListProps[] }>,
) {
	const props = data || {};
	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<link rel='stylesheet' href='css/line-icons.css' />
				<link rel='stylesheet' href='css/swiper-bundle.min.css' />
				<link rel='stylesheet' href='css/floating-button.css' />
				<NavBar user={props.user} path={props.path} />
				<Posts posts={props.posts} />
				<Spots spots={props.spots} />
				<script src='js/flowbite.js' />
				<script src='js/swiper-bundle.min.js' />
				<script src='js/common.js' />
			</body>
		</>
	);
}
