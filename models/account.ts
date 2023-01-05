import {
  prepareLocalFile,
  prepareVirtualFile,
} from "https://deno.land/x/mock_file@v1.0.1/mod.ts";
import { DB } from 'sqlite/mod.ts';
import head from 'ramda/source/head.js';
import { Account } from "../type.ts";

await prepareLocalFile("./db/account.db");
prepareVirtualFile("./db/account.db-journal");

function exec<T = void>(fn: (db: DB) => T) {
	const db = new DB('./db/account.db');
	const result = fn(db);
	db.close();
	return result;
}

export default class AccountModel {
	static initialize() {
		exec((db) => {
			db.execute(`
        CREATE TABLE IF NOT EXISTS "accounts" (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          UNIQUE (username,password)
        );
      `);
			const result = db.query(
				`
        SELECT * FROM "accounts" WHERE username = :username AND password = :password
      `,
				{ username: 'superadmin', password: 'password' },
			);
			if (head(result)) return;
			db.query(
				`
        INSERT INTO accounts (username, password) VALUES (?, ?)
      `,
				['superadmin', 'password'],
			);
		});
	}

	static findById(id: number) {
		return exec<Account | null>((db) => {
			const result = head(
				db.query(
					`
          SELECT id, username, password FROM "accounts" WHERE id=?
        `,
					[id],
				),
			);
			if (!result) return null;
			const [, username, password] = result;
			return {
				id,
				username,
				password,
			};
		});
	}

	static updatePassword(id: number, password: string) {
		exec((db) => {
			const result = db.query(
				`
				UPDATE "accounts"
				SET password = :password
				WHERE id = :id
			`,
				{ id, password },
			);
			console.log('result', result, id, password)
		});
		exec((db) => {
			const result = db.query(
				`
				SELECT id, username, password FROM "accounts"
			`,
				{ id, password },
			);
			console.log('accounts', result)
		});
	}

	static findByUsernameAndPassword(
		params: Pick<Account, 'username' | 'password'>,
	) {
		return exec<Account | null>((db) => {
			const result = head(
				db.query(
					`
          SELECT id, username, password FROM "accounts" WHERE username = :username AND password = :password
        `,
					params,
				),
			);
			if (!result) return null;
			const [id, username, password] = result;
			return {
				id,
				username,
				password,
			};
		});
	}
}
