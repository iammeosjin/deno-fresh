export default function sendEmail(email: string, params: {
	title: string;
	body: string;
}) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append(
		'Authorization',
		'Basic MzAyZDJmZjlkYzhiNzIyZGVjOTdlYWJhODZiZDY4MjA6ZThjNzkxMjJiODkzY2MxZTMyZTE3NmEzODhiMDUwNTU=',
	);

	const raw = JSON.stringify({
		FromEmail: Deno.env.get('MJ_APIKEY_PRIVATE') ||
			'iammeosjin@gmail.com',
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
