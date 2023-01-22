import { Handlers } from '$fresh/server.ts';
import { Context } from '../../type.ts';
import sendEmail from '../../lib/send-email.ts';

export const handler: Handlers<Context> = {
	async POST(req) {
		const body = await req.json();

		try {
			const response = await sendEmail(body.email, {
				title: body.title,
				body: body.body,
			});
			const message = await response.text();
			if (response.status >= 400) {
				throw new Error(message);
			}
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
