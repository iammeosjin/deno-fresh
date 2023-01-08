import { Handlers, PageProps } from '$fresh/server.ts';
import { Account, Context } from '../type.ts';
import {
	copy,
	readerFromStreamReader,
} from 'https://deno.land/std@0.131.0/streams/conversion.ts';
import { resolve } from 'std/path/mod.ts';
import { MultipartReader } from 'https://deno.land/std@0.127.0/mime/multipart.ts';
import compose from 'ramda/source/compose.js';
import nth from 'ramda/source/nth.js';
import split from 'ramda/source/split.js';

const getBoundary = compose(
	nth(1),
	split('='),
	nth(1),
	split(';'),
);

export const handler: Handlers<Context> = {
	async POST(req, ctx) {
		const url = new URL(req.url);
		const headers = new Headers();

		let boundary;
		const contentType = req.headers.get('content-type');

		if (contentType?.startsWith('multipart/form-data')) {
			boundary = getBoundary(contentType);
		}

		if (!boundary) {
			return new Response('Invalid boundary', {
				status: 400, // "See Other"
				headers,
			});
		}

		const bucket = resolve(Deno.cwd(), './static/bucket');
		console.log('bucket', bucket);

		const body = req.body?.getReader();
		const reader = readerFromStreamReader(body!);

		const form = await new MultipartReader(reader, boundary).readForm({
			maxMemory: 10 << 20,
			dir: bucket,
		});
		const files = (form.files('file') || []);
		const file = files[0];
		console.log(file.tempfile);

		await Deno.writeFile(
			resolve(bucket, file.filename),
			file.content as Uint8Array,
		);

		return new Response('OK', {
			status: 200, // "See Other"
			headers,
		});
	},
};
