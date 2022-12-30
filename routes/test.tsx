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
				<div className="bg-gradient-to-tr from-red-400 to-yellow-50 relative h-screen w-screen">
					<img className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50" src="bg.jpg"/>
					<div className="absolute inset-0 flex flex-col justify-center items-center w-full max-w-full mx-auto text-center">
						<NavBar user={props.user} path={props.path}/>
						<div class="grid grid-cols-3">
							<div class="z-20">
								<div class="py-10 px-6 bg-white mx-auto rounded-3xl w-80">
									<div class="mb-7">
										<h3 class="font-semibold text-2xl text-gray-800">Sign In as Admin</h3>
									</div>
									<div class="space-y-5">
										<div class="relative">
											<input class=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" type="" placeholder="Email"/>
										</div>
										<div class="relative" x-data="{ show: true }">
											<input placeholder="Password" type="password" class="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"/>
										</div>
										<div>
											<input type="submit" class="w-full flex justify-center bg-red-800  hover:bg-red-600 text-gray-100 p-3 rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" value="Login" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
		</>
	);
}
