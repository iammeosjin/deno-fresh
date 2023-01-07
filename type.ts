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
