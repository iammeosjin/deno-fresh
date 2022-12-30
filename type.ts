export type Account = {
	id: number;
	username: string;
	password: string;
};

export type Context = {
	user?: Account | null;
  path: string;
	error?: Error;
}
