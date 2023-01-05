import head from 'ramda/source/head.js';
import { Account } from '../type.ts';
import pool from '../lib/pool.ts';

export default class AccountModel {
	static async initialize() {
		const connection = await pool.connect();
		try {
			// Create the table
			await connection.queryObject`
				CREATE TABLE IF NOT EXISTS "accounts" (
					id SERIAL PRIMARY KEY,
					username TEXT NOT NULL,
					password TEXT NOT NULL,
					UNIQUE (username, assword)
				);
			`;

			const { rowCount } = await connection.queryObject<Account>(
				`
				SELECT * FROM "accounts" WHERE username = 'superadmin'
			`,
			);

			if (rowCount === 0) {
				await connection.queryObject`
					INSERT INTO accounts (username, password) VALUES ('superadmin', 'password');
				`;
			}
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async findById(id: number) {
		const connection = await pool.connect();
		let account: Account | null = null;
		try {
			const { rows } = await connection.queryObject<Account>(
				`
				SELECT * FROM "accounts" WHERE id = ${id}
			`,
			);
			account = head(rows);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}

		return account;
	}

	static async updatePassword(id: number, password: string) {
		const connection = await pool.connect();
		try {
			await connection.queryObject<Account>(
				`
				UPDATE "accounts"
				SET password = '${password}'
				WHERE id = ${id}
			`,
			);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async findByUsernameAndPassword(
		params: Pick<Account, 'username' | 'password'>,
	) {
		const connection = await pool.connect();
		let account: Account | null = null;
		try {
			const { rows } = await connection.queryObject<Account>(
				`
				SELECT id, username, password FROM accounts WHERE username = '${params.username}' AND password = '${params.password}'
			`,
			);
			account = head(rows);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}

		return account;
	}
}
