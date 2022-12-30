import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from "../type.ts";
import AccountModel from "../models/account.ts";



export const handler: Handlers<Context> = {
	GET(req, ctx) {
		const account = localStorage.getItem('user');
		let user: Account | undefined | null = undefined;
		if (account) {
			user = AccountModel.findById(parseInt(account, 10));
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
			</Head>
			
			<body>
				<NavBar user={props.user} path={props.path}/>
			</body>
		</>
	);
}
