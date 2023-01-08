import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from 'https://deno.land/x/fresh@1.1.2/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import AccountModel from '../models/account.ts';
import { Account, Context } from '../type.ts';
import { getCookies } from 'std/http/cookie.ts';

export const handler: Handlers<
	Context & {
		fields: string[];
		success?: string;
		defaults?: {
			oldPassword?: string;
			newPassword?: string;
			confirmPassword?: string;
		};
	}
> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;

		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}

		const url = new URL(req.url);

		if (!user) {
			const headers = new Headers();
			headers.set('location', '/login');
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			});
		}

		return ctx.render({ user, path: url.pathname, fields: [] });
	},
	async POST(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;

		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}

		const url = new URL(req.url);

		if (!user) {
			const headers = new Headers();
			headers.set('location', '/login');
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			});
		}

		const form = await req.formData();
		const oldPassword = form.get('oldPassword') as string;
		const newPassword = form.get('newPassword') as string;
		const confirmPassword = form.get('confirmPassword') as string;
		const fields: string[] = [];
		const defaults = { oldPassword, newPassword, confirmPassword };
		if (!oldPassword) {
			fields.push('oldPassword');
		}

		if (!newPassword) {
			fields.push('newPassword');
		}

		if (!confirmPassword) {
			fields.push('confirmPassword');
		}

		if (fields.length > 0) {
			return ctx.render({
				path: url.pathname,
				user,
				fields,
				defaults,
			});
		}

		if (user.password !== oldPassword) {
			return ctx.render({
				path: url.pathname,
				error: new Error('Incorrect password'),
				user,
				fields: [],
			});
		}

		if (newPassword !== confirmPassword) {
			return ctx.render({
				path: url.pathname,
				error: new Error('Password does not match'),
				user,
				fields: [],
			});
		}

		if (oldPassword === newPassword) {
			return ctx.render({
				path: url.pathname,
				error: new Error('New password can\'t be old password'),
				user,
				fields: [],
			});
		}

		await AccountModel.updatePassword(user.id, newPassword);

		return ctx.render({
			path: new URL(req.url).pathname,
			success: 'Password reset successfully!',
			user,
			fields: [],
		});
	},
};

export default function Login({ data }: PageProps<
	Context & {
		fields: string[];
		success?: string;
		defaults?: {
			oldPassword?: string;
			newPassword?: string;
			confirmPassword?: string;
		};
	}
>) {
	const props = data || {};
	let message: preact.JSX.Element = <></>;
	if (props.success) {
		message = (
			<span class='text-green-700 font-medium p-2 text-sm'>
				{props.success}
			</span>
		);
	}

	if (props.error) {
		message = (
			<span class='text-amber-700 font-medium p-2 text-sm'>
				{props.error.message}
			</span>
		);
	}
	return (
		<>
			<Head>
				<title>TACROS</title>
			</Head>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<div className='bg-gradient-to-tr from-red-400 to-yellow-50 relative h-screen w-screen'>
					<img
						className='absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50'
						src='bg.jpg'
					/>
					<div className='absolute inset-0 flex flex-col justify-center items-center w-full max-w-full mx-auto text-center'>
						<NavBar user={props.user} path={props.path} />

						<div class='max-w-screen-xl grid grid-cols-1 gap-8'>
							<form
								class='lg:flex z-20'
								method='post'
								action='/reset'
							>
								<div class='py-10 px-6 bg-white mx-auto rounded-3xl w-80'>
									<div class='mb-7'>
										<h3 class='font-semibold text-2xl text-gray-800'>
											Reset Password
										</h3>
									</div>
									<div class='space-y-5'>
										<div class='relative'>
											<input
												class={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 rounded-lg border focus:outline-none focus:border-blue-400 ${
													props.fields.includes(
															'oldPassword',
														)
														? 'border-red-400'
														: 'border-gray-200'
												}`}
												type='password'
												name='oldPassword'
												value={props.defaults
														?.oldPassword
													? props.defaults
														?.oldPassword
													: ''}
												placeholder='Old Password'
											/>
										</div>
										<div class='relative'>
											<input
												placeholder='New Password'
												type='password'
												name='newPassword'
												value={props.defaults
														?.newPassword
													? props.defaults
														?.newPassword
													: ''}
												class={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 rounded-lg border focus:outline-none focus:border-blue-400 ${
													props.fields.includes(
															'newPassword',
														)
														? 'border-red-400'
														: 'border-gray-200'
												}`}
											/>
										</div>
										<div class='relative'>
											<input
												placeholder='Confirm New Password'
												type='password'
												name='confirmPassword'
												value={props.defaults
														?.confirmPassword
													? props.defaults
														?.confirmPassword
													: ''}
												class={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 rounded-lg border focus:outline-none focus:border-blue-400 ${
													props.fields.includes(
															'confirmPassword',
														)
														? 'border-red-400'
														: 'border-gray-200'
												}`}
											/>
										</div>
										<div>
											<input
												type='submit'
												class='w-full flex justify-center bg-red-800  hover:bg-red-600 text-gray-100 p-3 rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500'
												value='Reset'
											/>
											{message}
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<script src='js/flowbite.js' />
			</body>
		</>
	);
}
