// deno-lint-ignore-file no-explicit-any
import compose from 'ramda/source/compose.js';
import nth from 'ramda/source/nth.js';
import split from 'ramda/source/split.js';
import { resolve } from 'std/path/mod.ts';
import { MultipartReader } from 'https://deno.land/std@0.127.0/mime/multipart.ts';
import { readerFromStreamReader } from 'https://deno.land/std@0.131.0/streams/conversion.ts';
import IPFS from './ipfs.ts';

const getBoundary = compose(
	nth(1),
	split('='),
	nth(1),
	split(';'),
);

const ipfsToken = Deno.env.get('IPFS_TOKEN');
const env = Deno.env.get('ENVIRONMENT');

export default async function upload(req: Request) {
	let boundary;
	const contentType = req.headers.get('content-type');

	if (contentType?.startsWith('multipart/form-data')) {
		boundary = getBoundary(contentType);
	}

	if (!boundary) {
		throw new Error('Invalid boundary');
	}

	const bucket = resolve(Deno.cwd(), './static/bucket');

	const body = req.body?.getReader();
	const reader = readerFromStreamReader(body!);

	const form = await new MultipartReader(reader, boundary).readForm({
		maxMemory: 10 << 20,
		dir: bucket,
	});

	const result: { name: string; url: string; uuid: string }[] = [];

	const uploader = env === 'production'
		? IPFS.uploadFileToNFTStorage
		: IPFS.uploadBufferLocal;

	for (const entry of form.entries()) {
		const [name, files] = entry;

		const file: any = files![0];

		result.push({
			name: name,
			uuid: crypto.randomUUID().replace(/-/g, ''),
			url: await uploader(
				{ name, content: file.content as Uint8Array },
				ipfsToken as string,
			),
		});
	}

	return result;
}
