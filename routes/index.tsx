import { Handlers, PageProps } from '$fresh/server.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context, Post } from '../type.ts';
import AccountModel from '../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import Posts from '../islands/Posts.tsx';
import PostModel from '../models/post.ts';

export const handler: Handlers<Context & { posts: Post[] }> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		const posts = await PostModel.find();

		return ctx.render({ user, path: url.pathname, posts });
	},
};

export default function Home({ data }: PageProps<Context & { posts: Post[] }>) {
	const props = data || {};
	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link
					href='css/fonts/poppins.css'
					rel='stylesheet'
				/>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<link rel='stylesheet' href='/css/swiper-bundle.min.css' />
				<NavBar user={props.user} path={props.path} />
				<div
					className='bg-gradient-to-tr from-red-400 to-yellow-50 relative w-full'
					style='height:32rem;'
				>
					<video
						className='absolute inset-0 flex flex-col w-full object-fill mix-blend-multiply filter brightness-50'
						style='height:32rem;'
						playsInline={true}
						autoPlay={true}
						muted={true}
						loop={true}
					>
						<source src='/res/bg.mp4' type='video/mp4' />
					</video>
					<div className='absolute inset-0 flex flex-col justify-center items-center w-full max-w-full mx-auto text-center'>
						<div>
							<h1 className='text-red-400 font-poppins font-extrabold text-3xl sm:text-4xl md:text-5xl md:leading-snug'>
								Welcome to <br />
								<span className='text-white text-7xl sm:text-6xl md:text-7xl'>
									Jasaan Misamis Oriental
								</span>
							</h1>
						</div>
					</div>
				</div>
				<Posts posts={data.posts} user={props.user} />
				<script src='js/flowbite.js' />
				<script src='/js/swiper-bundle.min.js' />
				<script src='/js/swiper.js' />
			</body>
		</>
	);
}
