import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from "../type.ts";
import AccountModel from "../models/account.ts";
import { getCookies } from "std/http/cookie.ts";


export const handler: Handlers<Context> = {
	GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = AccountModel.findById(parseInt(cookies.user, 10));
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
				<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>
				<link rel="stylesheet" href="common.css" />
				
			</Head>
			
			<body>
				<NavBar user={props.user} path={props.path}/>
			</body>
		</>
	);
}
