// deno-lint-ignore-file no-explicit-any

import head from 'ramda/source/head.js';
import toPairs from 'ramda/source/toPairs.js';
import isEmpty from 'ramda/source/isEmpty.js';
import filter from 'ramda/source/filter.js';
import identity from 'ramda/source/identity.js';
import { Account, Barangay, Category } from '../type.ts';
import pool from '../lib/pool.ts';
import generateCategoryColors from '../lib/generate-category-colors.ts';

export type Spot = {
	slug: string;
	images: string[];
	name: string;
	categories: Category[];
	openForReservations: boolean;
	barangay: Barangay;
	address?: string;
	entranceFee?: number;
	minCottagePriceRange?: number;
	maxCottagePriceRange?: number;
	minRoomPriceRange?: number;
	maxRoomPriceRange?: number;
	search: string;
	owner: string;
	roomEnabled: boolean;
	cottageEnabled: boolean;
};

function generateSearch(params: Omit<Spot, 'search'>) {
	return `${params.name.toLowerCase()} ${
		params.categories.map((category) => category.toLowerCase())
			.join(' ')
	} ${params.barangay.toLowerCase()}`;
}

export default class SpotModel {
	static async initialize() {
		const connection = await pool.connect();
		try {
			// Create the table
			await connection.queryObject`
				CREATE TABLE IF NOT EXISTS "spots" (
					id SERIAL PRIMARY KEY,
					images TEXT[],
					name TEXT NOT NULL,
					slug TEXT NOT NULL,
					categories TEXT[],
					openForReservations BOOL DEFAULT FALSE,
					barangay VARCHAR,
					address TEXT,
					entranceFee FLOAT,
					minCottagePriceRange FLOAT,
					maxCottagePriceRange FLOAT,
					minRoomPriceRange FLOAT,
					maxRoomPriceRange FLOAT,
					owner TEXT,
					search TEXT,
					"roomEnabled" BOOL DEFAULT FALSE,
					"cottageEnabled" BOOL DEFAULT FALSE,
					UNIQUE (barangay, name),
					UNIQUE (slug)
				);
			`;

			await connection.queryObject`
			CREATE INDEX IF NOT EXISTS "spot_search" ON "spots"("search");
			CREATE INDEX IF NOT EXISTS "spot_slug" ON "spots"("slug");
			`;
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

	static async create(input: Omit<Spot, 'search'>) {
		const connection = await pool.connect();
		try {
			await connection.queryArray(
				`
				INSERT INTO
				"spots"(
					"images",
					"name",
					"slug",
					"categories",
					"barangay",
					"address",
					"openforreservations",
					"entrancefee",
					"mincottagepricerange",
					"maxcottagepricerange",
					"minroompricerange",
					"maxroompricerange",
					"owner",
					"search",
					"roomEnabled",
					"cottageEnabled"
				)
				VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
			`,
				input.images,
				input.name.toLowerCase(),
				input.name.toLowerCase().replace(/ /g, '-'),
				input.categories,
				input.barangay.toLowerCase(),
				input.address,
				input.openForReservations,
				input.entranceFee,
				input.minCottagePriceRange,
				input.maxCottagePriceRange,
				input.minRoomPriceRange,
				input.maxRoomPriceRange,
				input.owner,
				generateSearch(input),
				input.roomEnabled,
				input.cottageEnabled,
			);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async findBySlug(slug: string) {
		const connection = await pool.connect();
		let doc: Spot | null = null;
		try {
			const { rows } = await connection.queryObject<Spot>(
				`
				SELECT 
					slug, 
					name, 
					images,
					address,
					barangay, 
					categories, 
					openforreservations as "openForReservations", 
					entrancefee as "entranceFee", 
					mincottagepricerange as "minCottagePriceRange", 
					maxcottagepricerange as "maxCottagePriceRange",
					minroompricerange as "minRoomPriceRange",
					maxroompricerange as "maxRoomPriceRange"
				FROM spots WHERE slug = '${slug}'
			`,
			);
			doc = head(rows);
		} finally {
			// Release the connection back into the pool
			connection.release();
		}

		return doc;
	}

	static async findByOwner(owner: string) {
		const connection = await pool.connect();
		try {
			const { rows } = await connection.queryObject<Spot>(
				`
				SELECT 
					slug, 
					name, 
					images,
					address,
					barangay, 
					categories, 
					openforreservations as "openForReservations", 
					entrancefee as "entranceFee", 
					mincottagepricerange as "minCottagePriceRange", 
					maxcottagepricerange as "maxCottagePriceRange",
					minroompricerange as "minRoomPriceRange",
					maxroompricerange as "maxRoomPriceRange"
				FROM spots WHERE owner = '${owner}'
			`,
			);
			return rows;
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}

	static async find(params: {
		filter?: Partial<
			{ barangay: string | null; openForReservations: boolean }
		>;
	}) {
		const connection = await pool.connect();

		const filters: string[] = [];

		const input = filter(identity, params.filter || {});

		if (!isEmpty(input)) {
			toPairs(input).map(([key, value]: [string, any]) => {
				if (typeof value === 'string') {
					filters.push(`${key}='${value}'`);
				} else {
					filters.push(`${key}=${value}`);
				}
			});
		}

		try {
			const { rows } = await connection.queryObject<Spot>(
				`
				SELECT
					slug, 
					name, 
					images,
					address,
					barangay, 
					categories, 
					openforreservations as "openForReservations", 
					entrancefee as "entranceFee", 
					mincottagepricerange as "minCottagePriceRange", 
					maxcottagepricerange as "maxCottagePriceRange",
					minroompricerange as "minRoomPriceRange",
					maxroompricerange as "maxRoomPriceRange"
				FROM spots ${
					isEmpty(filters) ? '' : `WHERE ${filters.join(' AND ')}`
				}
	`,
			);
			return rows.map((row) => ({
				...row,
				categories: generateCategoryColors(row.categories),
			}));
		} finally {
			// Release the connection back into the pool
			connection.release();
		}
	}
}
