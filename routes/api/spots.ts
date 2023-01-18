import { Handlers } from '$fresh/server.ts';
import { Context } from '../../type.ts';
import SpotModel from '../../models/spot.ts';

export const handler: Handlers<Context> = {
	async GET(req) {
		const url = new URL(req.url);
		const barangay = url.searchParams.get('barangay');
		const openForReservations = url.searchParams.get('openForReservations');
		const spots = await SpotModel.find({
			filter: { barangay, openForReservations: !!openForReservations },
		});

		return new Response(JSON.stringify(spots), {
			status: 200, // "See Other"
		});
	},
};
