/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';
import AccountModel from './models/account.ts';

import twindPlugin from '$fresh/plugins/twind.ts';
import twindConfig from './twind.config.ts';

AccountModel.initialize();

if (!Deno.env.get('DATABASE_URL')) {
	Deno.env.set(
		'DATABASE_URL',
		'postgresql://tacros:password@localhost:5432/tacros',
	);
}
await start(manifest, { plugins: [twindPlugin(twindConfig)] });
