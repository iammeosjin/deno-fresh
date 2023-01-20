import { Reservation } from '../type.ts';
import pool from '../lib/pool.ts';

export default class ReservationModel {
	static async initialize() {
		const connection = await pool.connect();
		try {
			// Create the table
			await connection.queryObject`
				CREATE TABLE IF NOT EXISTS "reservations" (
					id SERIAL PRIMARY KEY,
					spot TEXT NOT NULL,
					name TEXT NOT NULL,
					"mobileNumber" TEXT NOT NULL,
					email TEXT NOT NULL,
					schedule TIMESTAMPTZ NOT NULL,
					"dateTimeCreated" TIMESTAMPTZ NOT NULL,
					deleted BOOL DEFAULT FALSE
				);
			`;

			await connection.queryObject`
			CREATE INDEX IF NOT EXISTS "reservations_spot_mobile_number" ON "reservations"("mobileNumber", "spot");
			CREATE INDEX IF NOT EXISTS "reservations_mobile_number" ON "reservations"("mobileNumber");
			`;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async create(input: Reservation) {
		const connection = await pool.connect();
		try {
			await connection.queryArray(
				`
				INSERT INTO
				"reservations"(
					"spot",
					"name",
					"mobileNumber",
					"email",
					"schedule",
					"dateTimeCreated"
				)
				VALUES($1, $2, $3, $4, $5::TIMESTAMPTZ, $6::TIMESTAMPTZ)
			`,
				input.spot,
				input.name.toLowerCase(),
				input.mobileNumber,
				input.email,
				input.schedule.toISOString(),
				new Date().toISOString(),
			);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async delete(id: number) {
		const connection = await pool.connect();
		try {
			await connection.queryObject(
				`
				UPDATE "reservations"
				SET "deleted"=true
				WHERE "id"=${id}
			`,
			);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async findByMobileNumber(mobileNumber: string) {
		const connection = await pool.connect();

		try {
			const { rows } = await connection.queryObject<Reservation>(
				`
				SELECT
					"id",
					"spot",
					"name",
					"mobileNumber",
					"email",
					"schedule",
					"dateTimeCreated"
				FROM reservations WHERE "mobileNumber" = '${mobileNumber}' AND "deleted"=true
			`,
			);
			return rows;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async findBySpots(spots: string[]) {
		const connection = await pool.connect();

		try {
			const { rows } = await connection.queryObject<Reservation>(
				`
				SELECT
					"id",
					"spot",
					"name",
					"mobileNumber",
					"email",
					"schedule",
					"dateTimeCreated"
				FROM reservations 
				WHERE "spot" IN (${
					spots.map((spot) => `'${spot}'`)
				}) AND "deleted"=false
			`,
			);
			return rows;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async find(filter: {
		spot: string;
		email: string;
		mobileNumber: string;
	}) {
		const connection = await pool.connect();

		try {
			const { rows } = await connection.queryObject<Reservation>(
				`
				SELECT
					"id",
					"spot",
					"name",
					"mobileNumber",
					"email",
					"schedule",
					"dateTimeCreated"
				FROM reservations 
				WHERE "spot" = '${filter.spot}' AND "email"='${filter.email}' AND "mobileNumber"='${filter.mobileNumber}' AND "deleted"=false
				LIMIT 1
			`,
			);
			return rows;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async findBySpot(spot: string) {
		const connection = await pool.connect();

		try {
			const { rows } = await connection.queryObject<Reservation>(
				`
				SELECT
					"id",
					"spot",
					"name",
					"mobileNumber",
					"email",
					"schedule",
					"dateTimeCreated"
				FROM reservations 
				WHERE "spot" = '${spot}' AND "deleted"=false
				LIMIT 1
			`,
			);
			return rows[0];
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}
}