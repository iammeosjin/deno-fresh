import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context, Post } from '../type.ts';
import AccountModel from '../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import Posts from '../islands/Posts.tsx';
import PostModel from '../models/post.ts';
import Spots from '../islands/Spots.tsx';
import chance from '../lib/chance.ts';

export const handler: Handlers<Context & { posts: Post[] }> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		const posts = await PostModel.find();

		return ctx.render({
			user,
			path: url.pathname,
			posts: chance.shuffle([
				...posts,
				...posts,
			]),
		});
	},
};

export default function Home({ data }: PageProps<Context & { posts: Post[] }>) {
	const props = data || {};
	return (
		<>
			<Head>
				<title>TACROS</title>
			</Head>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<link rel='stylesheet' href='css/line-icons.css' />
				<link rel='stylesheet' href='css/swiper-bundle.min.css' />
				<link rel='stylesheet' href='css/floating-button.css' />
				<NavBar user={props.user} path={props.path} />
				<Posts posts={props.posts} />
				<Spots />
				<script src='js/flowbite.js' />
				<script src='js/swiper-bundle.min.js' />
				<script src='js/common.js' />
			</body>
		</>
	);
}
