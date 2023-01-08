import { FormFile } from 'https://deno.land/std@0.127.0/mime/multipart.ts';

export default class IPFS {
	static async uploadFileLocal(file: FormFile) {
		const form = new FormData();
		form.append(
			'file',
			new File([file.content as Uint8Array], file.filename),
		);

		// const headers = new Headers();

		// headers.set('Authorization', `Bearer ${ipfsToken}`);

		const response = await fetch(
			`http://127.0.0.1:5001/api/v0/add?stream-channels=true&pin=false&wrap-with-directory=false&progress=false`,
			{
				method: 'POST',
				headers: new Headers(),
				body: form,
			},
		);

		if (response.status >= 300) {
			console.log(await response.text());
			throw new Error('Invalid IPFS request');
		}

		const body = await response.json();

		return `http://localhost:8080/ipfs/${body.Hash}`;
	}

	static async uploadFileToNFTStorage(file: FormFile, token: string) {
		const form = new FormData();
		form.append(
			'file',
			new File([file.content as Uint8Array], file.filename),
		);

		const headers = new Headers();

		headers.set('Authorization', `Bearer ${token}`);

		const response = await fetch('https://api.nft.storage/upload', {
			method: 'POST',
			body: form,
			headers: headers,
		});

		const result = await response.text();

		if (response.status >= 400 && response.status < 500) {
			const body = JSON.parse(result);
			console.error(body);
			throw new Error(body.error.message);
		}

		const body = JSON.parse(result);

		return `https://${body.value.cid}.ipfs.nftstorage.link/${file.filename}`;
	}
}
