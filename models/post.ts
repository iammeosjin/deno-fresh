import { Chance } from 'https://cdn.skypack.dev/chance?dts';
import head from 'ramda/source/head.js';
import times from 'ramda/source/times.js';
import { Post } from '../type.ts';
import pool from '../lib/pool.ts';
import { Timestamp } from 'postgres/query/types.ts';

const chance = new Chance();

export default class PostModel {
	static async initialize() {
		const connection = await pool.connect();
		try {
			// Create the table
			await connection.queryObject`
				CREATE TABLE IF NOT EXISTS "posts" (
					id SERIAL PRIMARY KEY,
					title TEXT NOT NULL,
					description TEXT,
					message TEXT,
					url TEXT NOT NULL,
					datetime_created timestamp(6) NOT NULL
				);
			`;

			const { rowCount } = await connection.queryObject<Post>(
				`
				SELECT * FROM "posts"
			`,
			);

			if ((rowCount || 0) < 6) {
				const titles = [
					'Kuyamis Opening Program',
					'Paglaum MisOr: Rise-CDO Cup',
					'Mugs and Cups',
					'T-shirts',
					'Buko Pie',
					'Food & Beverages',
				];
				const promises = times((index: number) => {
					return connection.queryArray<
						[[string, string, string, string, Timestamp]]
					>(
						`INSERT INTO posts (title, description, message, url, datetime_created) VALUES ($1, $2, $3, $4, $5::TIMESTAMP)`,
						titles[index],
						chance.sentence({
							words: chance.integer({ min: 5, max: 8 }),
						}),
						chance.paragraph({
							sentences: chance.integer({ min: 1, max: 4 }),
						}),
						`images\/posts\/${index + 1}.jpg`,
						new Date().toISOString(),
					);
				}, 6);
				await Promise.all(promises);
			}
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async findById(id: number) {
		const connection = await pool.connect();
		let doc: Post | null = null;
		try {
			const { rows } = await connection.queryObject<Post>(
				`
				SELECT * FROM "posts" WHERE id = ${id}
			`,
			);
			doc = head(rows);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}

		return doc;
	}

	static async find() {
		const connection = await pool.connect();
		let docs: Post[] = [];
		try {
			const { rows } = await connection.queryObject<Post>(
				`
				SELECT * FROM "posts" LIMIT 20
			`,
			);
			docs = rows;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}

		return docs;
	}
}
