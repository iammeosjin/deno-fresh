import { Handlers, PageProps } from '$fresh/server.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context, Post } from '../type.ts';
import AccountModel from '../models/account.ts';
import SpotModel from '../models/spot.ts';
import { getCookies } from 'std/http/cookie.ts';
import PostModel from '../models/post.ts';
import Spots from '../islands/Spots.tsx';
import Resorts from '../islands/Resorts.tsx';
import chance from '../lib/chance.ts';
import { PostListProps } from '../components/PostList.tsx';
import TouristSpots from '../islands/Tourist-Spots.tsx';
import Places from '../islands/Places.tsx';
import IconSquareX from 'tablerIcons/square-x.tsx';

export const handler: Handlers<
	Context & {
		posts: Post[];
		spots: PostListProps[];
		search: string | null;
	}
> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		const posts = await PostModel.find();
		let search = url.searchParams.get('search');

		let filter = {};
		if (search) {
			search = search.toLowerCase();
			filter = { search: search };
		}

		const spots = await SpotModel.find({ filter });
		return ctx.render({
			user,
			spots: spots as unknown as PostListProps[],
			path: url.pathname,
			posts: chance.shuffle([
				...posts,
				...posts,
			]),
			search,
		});
	},
};

export default function Home(
	{ data }: PageProps<
		Context & {
			posts: Post[];
			spots: PostListProps[];
			search: string | null;
		}
	>,
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
				<Spots />
				{data.search
					? (
						<div class='container w-full'>
							<button
								type='button'
								class='px-3 py-1 bg-white rounded border(gray-400 1) flex gap-2 mb-2 outline-none focus:outline-none'
							>
								{data.search}
								<a href='/services'>
									<IconSquareX class='w-6 h-6' />
								</a>
							</button>
							<hr />
							<Places type={'SEARCH'} spots={data.spots} />
						</div>
					)
					: (
						<div>
							<Resorts
								spots={props.spots.filter((spot) =>
									spot.type === 'RESORT'
								)}
							/>
							<TouristSpots
								spots={props.spots.filter((spot) =>
									spot.type === 'TOURIST_SPOT'
								)}
							/>
						</div>
					)}

				<script src='js/flowbite.js' />
				<script src='js/swiper-bundle.min.js' />
				<script src='js/swiper.js' />
			</body>
		</>
	);
}
