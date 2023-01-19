import { Handlers } from '$fresh/server.ts';
import { Context } from '../../type.ts';
import ReservationModel from '../../models/reservation.ts';

export const handler: Handlers<Context> = {
	async DELETE(req) {
		const body = await req.json();

		await ReservationModel.delete(body.id);

		return new Response(null, {
			status: 200, // "See Other"
		});
	},
};
