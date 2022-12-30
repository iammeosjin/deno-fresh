import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from "https://deno.land/x/fresh@1.1.2/runtime.ts";
import NavBar from "../components/NavBar.tsx";
import AccountModel from '../models/account.ts';
import { Account, Context } from '../type.ts';
import { setCookie,getCookies, deleteCookie  } from "std/http/cookie.ts";


export const handler: Handlers<Context & { fields: string[]; defaults?: { username?: string; password?: string } }> = {
	GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		
		if (cookies.user) {
			user = AccountModel.findById(parseInt(cookies.user, 10));
		}

		const url = new URL(req.url);
		const logout = url.searchParams.get('logout') === 'true';
		if (logout) {
			const headers = new Headers(req.headers);
			deleteCookie(headers, "user", { domain: url.hostname });
			headers.set('location', '/login');
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			});
		}

		if (user) {
			const headers = new Headers();
			headers.set('location', '/');
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			});
		}

		return ctx.render({ user, path: url.pathname, fields: [] });
	},
	async POST(req, ctx) {
		const form = await req.formData();
		const username = form.get('username') as string;
		const password = form.get('password') as string;
		const fields: string[] = [];
		const url = new URL(req.url);
		const defaults = { username, password };
		if (!username) {
			fields.push('username');
		}

		if (!password) {
			fields.push('password');
		}

		if (fields.length > 0) {
			return ctx.render({ 
				path: url.pathname, 
				fields,
				defaults
			});
		}
		const account = AccountModel.findByUsernameAndPassword({
			username,
			password,
		});

		if (!account) {
			
			return ctx.render({ 
				path: url.pathname , 
				error: new Error('Invalid Credentials!'),
				fields: [],
			});
		}
		const headers = new Headers();
		setCookie(headers, {
			name: "user",
			value: account.id.toString(), // this should be a unique value for each session
			maxAge: 120,
			sameSite: "Lax", // this is important to prevent CSRF attacks
			domain: url.hostname,
			secure: true,
		});
		headers.set('location', '/');
		return new Response(null, {
			status: 303, // "See Other"
			headers,
		});
	},
};

export default function Login({ data }: PageProps<Context & { fields: string[]; defaults?: { username?: string; password?: string } }>) {
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
						
						<div class="max-w-screen-xl grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-7 lg:grid-cols-4 sm:grid-cols-1 gap-8 mt-8 md:mt-8">
							<form
								class="lg:flex z-20"
								method='post'
								action='/login'
							>
								<div class="py-10 px-6 bg-white mx-auto rounded-3xl w-80">
									<div class="mb-7">
										<h3 class="font-semibold text-2xl text-gray-800">Sign In as Admin</h3>
									</div>
									<div class="space-y-5">
										<div class="relative">
											<input 
												class={ `w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 rounded-lg border focus:outline-none focus:border-blue-400 ${props.fields.includes('username') ? "border-red-400" : "border-gray-200"}`} 
												type="text" 
												name="username"
												value={ props.defaults?.username ? props.defaults?.username : '' }
												placeholder="Username"/>
										</div>
										<div class="relative">
											<input 
												placeholder="Password" 
												type="password" 
												name="password"
												value={ props.defaults?.password ? props.defaults?.password : '' }
												class={ `w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 rounded-lg border focus:outline-none focus:border-blue-400 ${props.fields.includes('password') ? "border-red-400" : "border-gray-200"}`} />
										</div>
										<div>
											<input type="submit" class="w-full flex justify-center bg-red-800  hover:bg-red-600 text-gray-100 p-3 rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" value="Login" />
											{
												props.error ? <span class="text-amber-700 font-medium p-2 text-sm">{ props.error.message }</span> : ''
											}
											
										</div>
									</div>
								</div>
							</form>
							
						</div>
					</div>
				</div>
			</body>
		</>
	);
}
