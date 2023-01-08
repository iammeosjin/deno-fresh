export default class IPFS {
	static async uploadFileLocal(params: {
		content: Uint8Array;
		name: string;
	}) {
		const form = new FormData();
		form.append(
			'file',
			new File([params.content as Uint8Array], params.name),
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

	static async uploadFileToNFTStorage(params: {
		content: Uint8Array;
		name: string;
	}, token: string) {
		const form = new FormData();
		form.append(
			'file',
			new File([params.content as Uint8Array], params.name),
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

		return `https://${body.value.cid}.ipfs.nftstorage.link/${params.name}`;
	}
}
