import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import NavBar from '../../components/NavBar.tsx';
import { Account, Context, Reservation } from '../../type.ts';
import AccountModel from '../../models/account.ts';
import SpotModel, { Spot } from '../../models/spot.ts';

import Place from '../../islands/Place.tsx';
import ReservationModel from '../../models/reservation.ts';
import Reservations from '../../islands/Reservations.tsx';

export const handler: Handlers<
	Context & {
		reservation: Omit<Reservation, 'spot'> & { spot: Spot | null };
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

		const { slug } = ctx.params;

		const spot = await SpotModel.findBySlug(slug);

		const reservation = await ReservationModel.findByMobileNumberAndSpot(
			{
				mobileNumber: cookies.owner,
				spot: slug,
			},
		);

		return ctx.render({
			user,
			path: url.pathname,
			reservation: {
				...reservation,
				spot: await SpotModel.findBySlug(reservation.spot),
			},
		});
	},
};

export default function Places(
	props: PageProps<
		Context & {
			reservation: Omit<Reservation, 'spot'> & { spot: Spot | null };
		}
	>,
) {
	const data = props.data || {};
	const { reservation } = data;

	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<link rel='stylesheet' href='/css/swiper-bundle.min.css' />
				<NavBar user={data.user} path={data.path} />
				<Place spot={reservation.spot!} />
				<Reservations />

				<script src='/js/flowbite.js' />
				<script src='/js/swiper-bundle.min.js' />
				<script src='/js/swiper.js' />
			</body>
		</>
	);
}
