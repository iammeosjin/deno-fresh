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

export default async function upload(req: Request, key: string) {
	let boundary;
	const contentType = req.headers.get('content-type');

	if (contentType?.startsWith('multipart/form-data')) {
		boundary = getBoundary(contentType);
	}

	if (!boundary) {
		throw new Error('Invalid boundary');
	}

	const bucket = resolve(Deno.cwd(), './static/bucket');
	console.log('bucket', bucket);

	const body = req.body?.getReader();
	const reader = readerFromStreamReader(body!);

	const form = await new MultipartReader(reader, boundary).readForm({
		maxMemory: 10 << 20,
		dir: bucket,
	});

	const files = (form.files(key) || []);
	const file = files[0];

	const uploader = env === 'production'
		? IPFS.uploadFileToNFTStorage
		: IPFS.uploadFileLocal;

	return {
		name: file.filename,
		url: await uploader(file, ipfsToken),
	};
}
