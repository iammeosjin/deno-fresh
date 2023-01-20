/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';
import AccountModel from './models/account.ts';
import PostModel from './models/post.ts';
import ReservationModel from './models/reservation.ts';

import twindPlugin from '$fresh/plugins/twind.ts';
import twindConfig from './twind.config.ts';
import SpotModel from './models/spot.ts';

await AccountModel.initialize();
await PostModel.initialize();
await SpotModel.initialize();
await ReservationModel.initialize();

await start(manifest, { plugins: [twindPlugin(twindConfig)] });

globalThis.addEventListener('unhandledrejection', (e) => {
	const err = e.reason;
	if (
		err instanceof Deno.errors.ConnectionReset ||
		err instanceof Deno.errors.BrokenPipe
	) {
		console.warn(
			'unhandled rejection',
			err,
		);
	}
});
