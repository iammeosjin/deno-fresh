import * as OTPAuth from 'https://deno.land/x/otpauth@v9.0.2/dist/otpauth.esm.js';

const totp = new OTPAuth.TOTP({
	issuer: 'ACME',
	label: 'AzureDiamond',
	algorithm: 'SHA1',
	digits: 4,
	period: 30,
	secret: 'NB2W45DFOIZA', // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
});

export default totp;
