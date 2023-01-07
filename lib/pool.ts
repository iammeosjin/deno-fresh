import { Pool } from 'postgres/pool.ts';

const databaseUrl = Deno.env.get('DATABASE_URL') ||
	'postgresql://tacros:password@localhost:5432/tacros';

export default new Pool(databaseUrl, 3, true);
