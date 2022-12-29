import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from "../type.ts";
import AccountModel from "../models/account.ts";

/*
<div
	class='relative overflow-hidden bg-no-repeat bg-cover'
	style="
	background-position: 50%;
	background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp');
	height: 350px;
"
>
	<div
		class='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed'
		style='background-color: rgba(0, 0, 0, 0.75)'
	>
		<div class='flex justify-center items-center h-full'>
			<div class='text-center text-white px-6 md:px-12'>
				<h1 class='text-5xl font-bold mt-0 mb-6'>
					Welcome to Jasaan Misamis Oriental
				</h1>
				<h3 class='text-3xl font-bold mb-8'>
					Subeading
				</h3>
				<button
					type='button'
					class='inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
					data-mdb-ripple='true'
					data-mdb-ripple-color='light'
				>
					Explore
				</button>
			</div>
		</div>
	</div>
</div>
*/



export const handler: Handlers<Context> = {
	GET(req, ctx) {
		const account = sessionStorage.getItem('user');
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
				<NavBar user={props.user} path={props.path}/>
			</Head>
			
			<body>
				
			</body>
		</>
	);
}
