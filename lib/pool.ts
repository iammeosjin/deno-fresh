import { Pool } from 'postgres/pool.ts';

const databaseUrl = Deno.env.get('DATABASE_URL');

export default new Pool(databaseUrl, 3, true);
