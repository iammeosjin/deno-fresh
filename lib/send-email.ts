import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';

const client = new SmtpClient();

const gmailCreds =
	(Deno.env.get('GMAIL') || 'iammeosjin@gmail.com:xGEtwaAd6MpYQv3g')
		.split(':');

export default async function sendEmail(email: string, params: {
	title: string;
	body: string;
}) {
	try {
		console.log('connecting');
		console.log(gmailCreds);
		await client.connect({
			hostname: 'smtp-relay.sendinblue.com',
			port: 587,
			username: gmailCreds[0],
			password: gmailCreds[1],
		});

		console.log('sending');

		await client.send({
			from: 'fakejohnroa@gmail.com', // Your Email address
			to: email, // Email address of the destination
			subject: params.title,
			content: params.body,
		});

		console.log('closing');

		await client.close();
	} catch (error) {
		console.log('error', error);
		throw error;
	}
}
