import { Handlers } from '$fresh/server.ts';
import { Context } from '../../type.ts';
import ReservationModel from '../../models/reservation.ts';

export const handler: Handlers<Context> = {
	async POST(req) {
		const body = await req.json();

		const reservations = await ReservationModel.findPendingReservations({
			spot: body.spot,
			email: body.email,
			mobileNumber: body.mobileNumber,
			schedule: body.schedule,
		});

		let invalidReservation;

		for (const reservation of reservations) {
			if (reservation.schedule < new Date()) {
				continue;
			}

			const newSched = new Date(body.schedule);
			if (newSched > reservation.schedule) {
				continue;
			}

			invalidReservation = reservation;
			break;
		}

		if (invalidReservation) {
			return new Response(
				JSON.stringify({
					reservation: invalidReservation,
					code: 'DUPLICATE_RESERVATION',
				}),
				{
					status: 400,
				},
			);
		}

		return new Response(null, {
			status: 200,
		});
	},
	async DELETE(req) {
		const body = await req.json();

		await ReservationModel.delete(body.id);

		return new Response(null, {
			status: 200, // "See Other"
		});
	},
};
