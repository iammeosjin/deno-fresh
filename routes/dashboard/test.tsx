import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import { Account, Context, Reservation } from '../../type.ts';
import AccountModel from '../../models/account.ts';
import ReservationModel from '../../models/reservation.ts';
import SpotModel, { Spot } from '../../models/spot.ts';
import PostList from '../../components/PostList.tsx';
import Bluebird from 'https://cdn.skypack.dev/bluebird?dts';
import generateCategoryColors from '../../lib/generate-category-colors.ts';

export const handler: Handlers<
	Context & {
		reservations: (Omit<Reservation, 'spot'> & { spot: Spot | null })[];
	}
> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		if (!cookies.owner) {
			const headers = new Headers();
			headers.set('location', '/dashboard');
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			});
		}

		const reservations = await Bluebird.map(
			await ReservationModel.findByMobileNumber(
				cookies.owner,
			),
			async (reservation) => {
				return {
					...reservation,
					spot: await SpotModel.findBySlug(reservation.spot),
				};
			},
		);

		return ctx.render({
			owner: cookies.owner,
			path: url.pathname,
			reservations: reservations,
		});
	},
};

export default function Places(
	props: PageProps<
		Context & {
			reservations: (Omit<Reservation, 'spot'> & { spot: Spot | null })[];
		}
	>,
) {
	const data = props.data || {};
	const { reservations } = data;

	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<link rel='stylesheet' href='/css/swiper-bundle.min.css' />
				<section id='places' class='bg-white pt-10 pb-20'>
					<div class='container w-full mx-auto'>
						<div class='row justify-center'>
							<div class='w-full lg:w-1/2'>
								<div class='section_title text-center pb-6'>
									<h5 class='sub_title'>Places</h5>
									<h4 class='main_title'>
										Checkout Jasaan Best Spots
									</h4>
								</div>
							</div>
						</div>
					</div>

					<div class='max-w-md w-full mx-auto mt-5'>
						<div class='relative'>
							<form action='' method='GET'>
								<input
									type='text'
									name='search'
									placeholder='Enter keywords'
									class='w-full px-3 py-2 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm'
								/>
								<div class='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke-width='2'
										stroke='currentColor'
										aria-hidden='true'
										class='w-4 h-4 text-gray-400'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
										>
										</path>
									</svg>
								</div>
							</form>
						</div>
					</div>
					<div class='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
						{reservations.map((reservation) => {
							return (
								<PostList
									spot={{
										...reservation.spot!,
										categories: generateCategoryColors(
											reservation.spot?.categories!,
										),
									}}
									hideReservations={true}
									redirectionLink={`/dashboard/${
										reservation.spot!.slug
									}`}
								/>
							);
						})}
					</div>
				</section>
				<script src='/js/flowbite.js' />
				<script src='/js/swiper-bundle.min.js' />
				<script src='/js/swiper.js' />
			</body>
		</>
	);
}
