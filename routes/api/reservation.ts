import { Handlers } from '$fresh/server.ts';
import { Context } from '../../type.ts';
import ReservationModel from '../../models/reservation.ts';
import { DateTime } from 'https://cdn.skypack.dev/luxon?dts';

export const handler: Handlers<Context> = {
	async POST(req) {
		const body = await req.json();

		const startOfDay = DateTime.fromISO(body.schedule).startOf(
			'day',
		);
		const endOfDay = DateTime.fromISO(body.schedule).endOf('day');

		let reservations = await ReservationModel.findReservations({
			spot: body.spot,
			startOfDay: startOfDay.toISO(),
			endOfDay: endOfDay.toISO(),
		});

		if (reservations.length > 5) {
			return new Response(
				JSON.stringify({
					code: 'RESERVATION_LIMIT_REACH',
				}),
				{
					status: 400,
				},
			);
		}

		reservations = await ReservationModel.findPendingReservations({
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
