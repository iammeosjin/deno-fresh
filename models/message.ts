import { Message } from '../type.ts';
import pool from '../lib/pool.ts';

export default class MessageModel {
	static async initialize() {
		const connection = await pool.connect();
		try {
			// Create the table
			await connection.queryObject`
				CREATE TABLE IF NOT EXISTS "messages" (
					id SERIAL PRIMARY KEY,
					name TEXT NOT NULL,
					email TEXT NOT NULL,
					message TEXT NOT NULL,
					"dateTimeCreated" TIMESTAMPTZ NOT NULL
				);
			`;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async delete(id: number) {
		const connection = await pool.connect();
		try {
			await connection.queryObject<Message>(
				`
				DELETE FROM "messages" WHERE id = ${id}
			`,
			);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async find(params?: {
		sort?: {
			key: string;
			order: 'ASC' | 'DESC';
		};
	}) {
		const connection = await pool.connect();
		let docs: Message[] = [];
		let order = 'ORDER BY "dateTimeCreated" DESC';
		if (params?.sort) {
			order = `ORDER BY ${params.sort.key} ${params.sort.order}`;
		}
		try {
			const { rows } = await connection.queryObject<Message>(
				`
				SELECT * FROM "messages" ${order}
			`,
			);
			docs = rows;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}

		return docs;
	}

	static async create(input: Omit<Message, 'id' | 'dateTimeCreated'>) {
		const connection = await pool.connect();
		try {
			await connection.queryArray(
				`
				INSERT INTO
				"messages"(
					"name", 
					"email", 
					"message", 
					"dateTimeCreated"
				)
				VALUES ($1, $2, $3, $4::TIMESTAMPTZ)
			`,
				input.name.toLowerCase(),
				input.email,
				input.message,
				new Date().toISOString(),
			);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}
}
