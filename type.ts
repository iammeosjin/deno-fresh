export enum Category {
	FOOD = 'FOOD',
	SWIM = 'SWIM',
	STAY = 'STAY',
	TOURIST_ATTRACTION = 'TOURIST ATTRACTION',
}

export enum CategoryColor {
	SWIM = 'text-blue-700',
	STAY = 'text-purple-700',
	FOOD = 'text-orange-700',
	'TOURIST ATTRACTION' = 'text-emerald-700',
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
	images: string[];
	dateTimeCreated: Date;
};

export type Context = {
	user?: Account | null;
	owner?: string | null;
	path: string;
	error?: Error;
};

export enum Barangay {
	APLAYA = 'Aplaya',
	BOBONTUGAN = 'Bobontugan',
	CORRALES = 'Corrales',
	DANAO = 'Danao',
	JAMPASON = 'Jampason',
	KIMAYA = 'Kimaya',
	LOWER_JASAAN = 'Lower Jasaan',
	LUZBANSON = 'Luzbanson',
	NATUBO = 'Natubo',
	SAN_ANTONIO = 'San Antonio',
	SAN_NICOLAS = 'San Nicolas',
	UPPER_JASAAN = 'Upper Jasaan',
}

export type Reservation = {
	id: number;
	spot: string;
	name: string;
	email: string;
	mobileNumber: string;
	schedule: Date;
	cottageType?: 'SMALL' | 'MEDIUM' | 'LARGE';
};
