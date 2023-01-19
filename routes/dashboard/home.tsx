// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import { Account, Context, Reservation } from '../../type.ts';
import AccountModel from '../../models/account.ts';
import ReservationModel from '../../models/reservation.ts';
import SpotModel, { Spot } from '../../models/spot.ts';

import Reservations from '../../islands/Reservations.tsx';

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

		const spots = await SpotModel.findByOwner(cookies.owner);
		if (spots.length === 0) {
			const headers = new Headers();
			headers.set('location', '/dashboard');
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			});
		}

		const reservations = await ReservationModel.findBySpots(
			spots.map((spot) => spot.slug),
		);

		return ctx.render({
			owner: cookies.owner,
			path: url.pathname,
			reservations: reservations.map((reservation) => ({
				...reservation,
				spot: spots.find((spot) =>
					spot.slug === reservation.spot
				) as any,
			})),
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
									<h5 class='sub_title'>Reservations</h5>
									<h4 class='main_title'>
										Manage Reservations
									</h4>
								</div>
							</div>
						</div>
					</div>
					<Reservations reservations={reservations}></Reservations>
				</section>
				<script src='/js/flowbite.js' />
				<script src='/js/swiper-bundle.min.js' />
				<script src='/js/swiper.js' />
			</body>
		</>
	);
}
