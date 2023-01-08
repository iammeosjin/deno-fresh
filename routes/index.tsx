import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';

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

export default function Home({ data }: PageProps<Context>) {
	const props = data || {};
	return (
		<>
			<Head>
				<title>TACROS</title>
				<link
					href='css/fonts/poppins.css'
					rel='stylesheet'
				/>
			</Head>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<div className='bg-gradient-to-tr from-red-400 to-yellow-50 relative h-screen w-screen'>
					<video
						className='absolute inset-0 w-full h-screen object-cover bg-video mix-blend-multiply filter brightness-50'
						playsInline={true}
						autoPlay={true}
						muted={true}
						loop={true}
					>
						<source src='/res/bg.mp4' type='video/mp4' />
					</video>
					<div className='absolute inset-0 flex flex-col justify-center items-center w-full max-w-full mx-auto text-center'>
						<NavBar user={props.user} path={props.path} />
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
				<script src='js/flowbite.js' />
			</body>
		</>
	);
}
