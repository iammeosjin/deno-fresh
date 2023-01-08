import { Handlers, PageProps } from '$fresh/server.ts';
import { useState } from 'preact/hooks';
import { Head } from '$fresh/runtime.ts';
import NavBar from '../components/NavBar.tsx';
import { Account, Context } from '../type.ts';
import AccountModel from '../models/account.ts';
import { getCookies } from 'std/http/cookie.ts';
import upload from '../lib/upload.ts';

export const handler: Handlers<Context & { file?: string }> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		return ctx.render({ user, path: url.pathname });
	},

	async POST(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);
		const file = await upload(req, 'file');
		return ctx.render({ user, path: url.pathname, file: file.url });
	},
};

export default function Home({ data }: PageProps<Context & { file?: string }>) {
	const props = data || {};
	const [image, setImage] = useState('images/about.svg');
	if (props.file) {
		setImage(props.file);
	}

	return (
		<>
			<Head>
				<title>TACROS</title>
			</Head>

			<body>
				<link rel='stylesheet' href='css/output.css' />
				<link rel='stylesheet' href='css/common.css' />
				<NavBar user={props.user} path={props.path} />
				<form
					method='POST'
					action='/contact'
					encType='multipart/form-data'
				>
					<input name='file' type='file' multiple={false}></input>
					<button
						type='submit'
						class='main-btn contact-btn btn-primary'
					>
						submit
					</button>
					<img src={image} />
				</form>
				<script src='js/flowbite.js' />
			</body>
		</>
	);
}
