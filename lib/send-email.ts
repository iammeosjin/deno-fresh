import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';

const client = new SmtpClient();

const gmailCreds =
	(Deno.env.get('GMAIL') || 'fakejohnroa@gmail.com:puzzbwouzjzoeuvl')
		.split(':');

export default async function sendEmail(email: string, params: {
	title: string;
	body: string;
}) {
	try {
		await client.connectTLS({
			hostname: 'smtp.gmail.com',
			port: 465,
			username: gmailCreds[0],
			password: gmailCreds[1],
		});

		await client.send({
			from: 'fakejohnroa@gmail.com', // Your Email address
			to: email, // Email address of the destination
			subject: params.title,
			content: params.body,
		});

		await client.close();
	} catch (error) {
		console.log('error', error);
		throw error;
	}
}
