export default function sendEmail(email: string, params: {
	title: string;
	body: string;
}) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append(
		'Authorization',
		'Basic ' + (Deno.env.get('MJ_TOKEN') ||
			'ODI0MGE0NTIyZjg2MTcxY2Q2NTdkNTlmY2Q2N2MxMTg6MWVlMjdhNGRiMTFiMzQ2NzY4ZjVjMDg3MWJiYTYyODY='),
	);

	const raw = JSON.stringify({
		FromEmail: Deno.env.get('MJ_EMAIL') ||
			'jasaantacros.123@gmail.com',
		FromName: 'Jasaan Tourist Association Center',
		Subject: params.title,
		'Html-part': params.body,
		'Recipients': [{ Email: email }],
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
	};

	return fetch('https://api.mailjet.com/v3/send', requestOptions);
}
