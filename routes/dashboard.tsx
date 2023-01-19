import { Handlers, PageProps } from '$fresh/server.ts';
import { Account, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import ReservationModel from '../models/reservation.ts';
import { getCookies, setCookie } from 'std/http/cookie.ts';
import SpotModel from '../models/spot.ts';

export const handler: Handlers<Context> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		return ctx.render({ user, owner: cookies.owner, path: url.pathname });
	},
	async POST(req, ctx) {
		const form = await req.formData();
		const mobileNumber = form.get('mobileNumber') as string;
		const spots = await SpotModel.findByOwner(mobileNumber);
		const url = new URL(req.url);
		if (spots.length === 0) {
			return ctx.render({
				path: url.pathname,
			});
		}

		const headers = new Headers();
		setCookie(headers, {
			name: 'owner',
			value: mobileNumber, // this should be a unique value for each session
			maxAge: 5000,
			sameSite: 'Lax', // this is important to prevent CSRF attacks
			domain: url.hostname,
			secure: true,
		});
		headers.set('location', '/dashboard/home');
		return new Response(null, {
			status: 303, // "See Other"
			headers,
		});
	},
};

export default function Places(
	props: PageProps<Context & { error: Error }>,
) {
	const data = props.data || {};

	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<link rel='stylesheet' href='/css/slider.css' />
				<link rel='stylesheet' href='/css/swiper-bundle.min.css' />
				<div className='bg-gradient-to-tr from-red-400 to-yellow-50 relative h-screen w-screen'>
					<img
						className='absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50'
						src='res/bg.png'
					/>
					<div className='absolute inset-0 flex flex-col justify-center items-center w-full max-w-full mx-auto text-center'>
						<div class='max-w-screen-xl grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-7 lg:grid-cols-4 sm:grid-cols-1 gap-8 mt-8 md:mt-8'>
							<form
								class='lg:flex z-20'
								method='post'
								action='/dashboard'
							>
								<div class='py-10 px-6 bg-white mx-auto rounded-3xl w-80'>
									<div class='mb-7'>
										<h3 class='font-semibold text-2xl text-gray-800'>
											Sign In as Owner
										</h3>
									</div>
									<div class='space-y-5'>
										<div class='relative'>
											<input
												class={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 rounded-lg border focus:outline-none focus:border-blue-400 border-gray-200`}
												type='text'
												name='mobileNumber'
												placeholder='Mobile Number'
											/>
										</div>
										<div>
											<input
												type='submit'
												class='w-full flex justify-center bg-red-800  hover:bg-red-600 text-gray-100 p-3 rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500'
												value='Login'
											/>
											{data.error
												? (
													<span class='text-amber-700 font-medium p-2 text-sm'>
														{data.error.message}
													</span>
												)
												: ''}
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<script src='/js/flowbite.js' />
				<script src='/js/slider.js' />
				<script src='/js/swiper-bundle.min.js' />
				<script src='/js/swiper.js' />
			</body>
		</>
	);
}
