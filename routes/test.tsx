import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import { getCookies } from 'std/http/cookie.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from '../type.ts';
import AccountModel from '../models/account.ts';

export const handler: Handlers<Context> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		console.log(url.href);

		return ctx.render({ user, path: url.pathname });
	},
};

export default function Home({ data }: PageProps<Context>) {
	const props = data || {};
	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<link rel='stylesheet' href='css/test.css' />
				<NavBar user={props.user} path={props.path} />
				<article class='tabs'>
					<section id='tab2'>
						<h2>
							<a href='#tab2'>Tab 2</a>
						</h2>
						<div class='tab-content'>Panel 2</div>
					</section>
					<section id='tab3'>
						<h2>
							<a href='#tab3'>Tab 3</a>
						</h2>
						<div class='tab-content'>Panel 3</div>
					</section>
					<section id='tab1'>
						<h2>
							<a href='#tab1'>Tab 1</a>
						</h2>
						<div class='tab-content'>Panel 1</div>
					</section>
				</article>
			</body>
		</>
	);
}
