import { Handlers } from '$fresh/server.ts';
import { Context } from '../type.ts';
import upload from '../lib/upload.ts';

export const handler: Handlers<Context> = {
	async POST(req, ctx) {
		const headers = new Headers();

		const result = await upload(req);

		return new Response(JSON.stringify(result), {
			status: 200, // "See Other"
			headers,
		});
	},
};
