import { Handlers, PageProps } from '$fresh/server.ts';
import AccountModel from '../models/account.ts';

interface Data {
	user?: {
		username: string;
		password: string;
	};
	errors: string[];
}

export const handler: Handlers<Data> = {
	async POST(req, ctx) {
		const form = await req.formData();
		const username = form.get('username') as string;
		const password = form.get('password') as string;
		const account = AccountModel.findByUsernameAndPassword({
			username,
			password,
		});

		console.log('account', account);

		if (!account) {
			return ctx.render({ errors: ['invalid credentials'] });
		}

		console.log(account);
		sessionStorage.setItem('user', account.id.toString());
		const headers = new Headers();
		headers.set('location', '/');
		return new Response(null, {
			status: 303, // "See Other"
			headers,
		});
	},
};

export default function Login({ data }: PageProps<Data>) {
	return (
		<>
			<div class='grid items-center justify-center h-screen'>
				<form
					class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
					method='post'
					action='/login'
				>
					<div class='mb-4'>
						<label
							class='block text-gray-700 text-sm font-bold mb-2'
							for='username'
						>
							Username
						</label>
						<input
							class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='username'
							name='username'
							type='text'
							placeholder='Username'
						/>
					</div>
					<div class='mb-6'>
						<label
							class='block text-gray-700 text-sm font-bold mb-2'
							for='password'
						>
							Password
						</label>
						<input
							class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							name='password'
							type='password'
							placeholder='******************'
						/>
					</div>
					<div class='flex items-center justify-between'>
						<button
							class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='submit'
						>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
