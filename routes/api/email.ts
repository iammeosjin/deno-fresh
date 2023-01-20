import { Handlers } from '$fresh/server.ts';
import { Context } from '../../type.ts';
import sendEmail from '../../lib/send-email.ts';

export const handler: Handlers<Context> = {
	async POST(req) {
		const body = await req.json();

		try {
			await sendEmail(body.email, {
				title: body.title,
				body: body.body,
			});
		} catch {
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 200,
		});
	},
};
