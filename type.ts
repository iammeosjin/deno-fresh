export enum Category {
	BEACH = 'BEACH',
	RESORT = 'RESORT',
	RESTAURANT = 'RESTAURANT',
}

export enum CategoryColor {
	BEACH = 'text-blue-700',
	RESORT = 'text-purple-700',
	RESTAURANT = 'text-orange-700',
}

export type Account = {
	id: number;
	username: string;
	password: string;
};

export type Post = {
	id: number;
	title: string;
	description: string;
	message: string;
	url: string;
};

export type Context = {
	user?: Account | null;
	path: string;
	error?: Error;
};
