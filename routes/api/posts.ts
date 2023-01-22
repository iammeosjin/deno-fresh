import { Handlers } from '$fresh/server.ts';
import { Context } from '../../type.ts';
import PostModel from '../../models/post.ts';

export const handler: Handlers<Context> = {
	async POST(req) {
		const body = await req.json();
		await PostModel.create(body);
		return new Response('OK', {
			status: 200, // "See Other"
		});
	},
};
