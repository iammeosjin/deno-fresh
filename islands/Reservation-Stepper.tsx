// deno-lint-ignore-file no-explicit-any
import IconListCheck from 'tablerIcons/list-check.tsx';
import IconListDetails from 'tablerIcons/list-details.tsx';
import IconUser from 'tablerIcons/user.tsx';
import IconDatabase from 'tablerIcons/database.tsx';
import { useState } from 'preact/hooks';
import Instructions from './Instruction.tsx';
import Agreement from './Agreement.tsx';
import ReservationForm from './Reservation-Form.tsx';
import OTPForm from './OTP-Form.tsx';
import { Reservation } from '../type.ts';
import { Spot } from '../models/spot.ts';
import { DateTime } from 'https://cdn.skypack.dev/luxon?dts';
import { Button } from '../components/Button.tsx';
import toTitleCase from '../lib/to-title-case.ts';
import totp from '../lib/otp.ts';
import isNil from 'ramda/source/isNil.js';
import Receipt from './Receipt.tsx';

const inactiveStepperStyle = {
	icon: 'border-gray-300 text-gray-500',
	text: 'text-gray-500',
	line: 'border-gray-300',
};
const activeStepperStyle = {
	icon: 'text-red-400 border-red-400',
	text: 'text-red-400',
	line: 'border-gray-300',
};
const doneStepperStyle = {
	icon: 'text-white border-red-400 bg-red-400',
	text: 'text-red-400',
	line: 'border-red-400',
};

const checkStepperStyle = (index: number, step: number) => {
	if (index === step) return activeStepperStyle;
	if (index < step) return doneStepperStyle;
	return inactiveStepperStyle;
};

export default function ReservationStepper(props: {
	spot?: Spot;
}) {
	const [step, setStep] = useState<
		number
	>(1);

	const [error, setError] = useState<
		string | null
	>(null);

	const [input, setInput] = useState<
		{
			error: boolean;
			disabled: boolean;
			spot?: Spot;
			otp?: string;
			otpTimestamp?: number;
			availableSpots?: Spot[];
		}
	>({ error: false, disabled: !!props.spot });

	const [reservation, setReservation] = useState<
		Omit<Reservation, 'id'> & { otp?: string } | null
	>(null);

	if (error) {
		document.getElementById('error-modal')?.classList.remove('hidden');
	}

	const submitReservation = async (event: any) => {
		event.preventDefault();

		if (event.target.title.value === 'default') {
			event.target.title.value = '';
		}

		if (!event.target.checkValidity()) {
			event.target.reportValidity();
			return;
		}
		const schedule = new Date(event.target.schedule.value);
		const spot = props.spot || input.spot;
		if (schedule < new Date()) {
			setError(
				`Cannot set schedule behind the current time`,
			);
			return;
		}

		const headers = new Headers();
		headers.set('Content-Type', 'application/json');
		const response = await fetch('/api/reservation', {
			method: 'POST',
			headers,
			body: JSON.stringify({
				spot: event.target.title.value,
				name: event.target.name.value,
				email: event.target.email.value,
				mobileNumber: event.target.mobileNumber.value,
				schedule: schedule.toISOString() as any,
			}),
		});

		if (response.status >= 400) {
			const body = await response.json();
			if (body.code === 'DUPLICATE_RESERVATION') {
				setError(
					`You have a pending reservation in ${
						toTitleCase(spot!.name)
					} at ${
						DateTime.fromJSDate(
							new Date(body.reservation.schedule),
						).setZone('utc+8').toFormat(
							'MMM dd, yyyy ccc hh:mm a',
						)
					}`,
				);
			}

			return;
		}

		const timestamp = Date.now();
		const token = totp.generate({ timestamp });

		const emailResponse = await fetch('/api/email', {
			method: 'POST',
			headers,
			body: JSON.stringify({
				email: event.target.email.value,
				title: 'Reservation OTP',
				body:
					`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
						<div style="margin:50px auto;width:70%;padding:20px 0">
							<div style="border-bottom:1px solid #eee">
								<a href="https://tacros.deno.dev/about#team" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Jasaan Tourist Association Center</a>
							</div>
							<p style="font-size:1.1em">Hi ${
						toTitleCase(event.target.name.value)
					},</p>
							<p>
							Thank you for choosing Jasaan Tourist Association Center. This is to confirm you reservation at ${
						toTitleCase(spot!.name)
					} on ${
						DateTime.fromJSDate(
							new Date(event.target.schedule.value),
						).setZone('utc+8').toFormat(
							'MMM dd, yyyy ccc hh:mm a',
						)
					}
							</p>
							<br/>
							<p>Use the following OTP to complete your reservation. OTP is valid for 5 minutes</p>
							<h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${token}</h2>
							<hr style="border:none;border-top:1px solid #eee" />
						</div>
					</div>`,
			}),
		});

		if (emailResponse.status >= 400) {
			setError(
				`Cannot send email. Connection refused.`,
			);
			return;
		}

		setStep(step + 1);

		setInput({
			...input,
			otp: token,
			otpTimestamp: timestamp,
		});

		setReservation({
			spot: event.target.title.value,
			name: event.target.name.value,
			email: event.target.email.value,
			mobileNumber: event.target.mobileNumber.value,
			schedule: new Date(event.target.schedule.value),
			cottageType: event.target.cottageEnabled.checked
				? event.target.cottageType.value
				: undefined,
		});
	};

	const submitOTP = async (event: any) => {
		event.preventDefault();

		const otp = [
			event.target.otp1.value,
			event.target.otp2.value,
			event.target.otp3.value,
			event.target.otp4.value,
		].join('');

		const delta = totp.validate({
			token: otp,
			window: 1,
			timestamp: input.otpTimestamp,
		});

		console.log(otp, input.otp);
		console.log('delta', delta);

		if (isNil(delta) || (delta || 0) > 0) {
			setInput({ error: true, disabled: false });
			return;
		}

		if (otp !== input.otp) {
			setInput({ error: true, disabled: false });
			return;
		}

		const headers = new Headers();
		headers.set('Content-Type', 'application/json');
		await fetch('/reservation', {
			method: 'POST',
			headers,
			body: JSON.stringify(reservation),
		});

		setStep(step + 1);
		setReservation({
			...reservation!,
			otp,
		});
	};

	const onBarangayChange = async (event: any) => {
		const response = await fetch(
			`/api/spots?barangay=${event.target.value.toLowerCase()}&openForReservations=true`,
		);
		const spots = await response.json();
		setInput({
			error: false,
			disabled: false,
			spot: undefined,
			availableSpots: spots,
		});
	};

	const onSpotChange = (event: any) => {
		setInput({
			error: false,
			disabled: false,
			spot: (input.availableSpots || []).find((spot) =>
				spot.slug === event.target.value
			),
			availableSpots: input.availableSpots,
		});
	};

	const spot = props.spot || input.spot || undefined;

	return (
		<section class='relative container pb-120'>
			<div
				id='error-modal'
				class='hidden bg-gray-50 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50'
			>
				<div class='bg-white px-12 py-12 rounded-md text-center'>
					<h1 class='text-xl mb-4 font-bold text-slate-500'>
						{error}
					</h1>
					<Button
						onClick={() => {
							setError(null);
							document.getElementById('error-modal')?.classList
								.add('hidden');
						}}
						class='px-7 py-2 ml-2 rounded-md text-md text-white font-semibold'
					>
						Ok
					</Button>
				</div>
			</div>
			<div class='p-5'>
				<div class='mx-4 p-4'>
					<div class='flex items-center'>
						<div class='flex items-center text-teal-600 relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(1, step).icon
								}`}
							>
								<IconListDetails class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(1, step).text
								}`}
							>
								Guide
							</div>
						</div>
						<div
							class={`flex-auto border-t-2 transition duration-500 ease-in-out ${
								checkStepperStyle(1, step).line
							}`}
						>
						</div>
						<div class='flex items-center text-white relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(2, step).icon
								}`}
							>
								<IconListCheck class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(2, step).text
								}`}
							>
								Privacy Notice
							</div>
						</div>
						<div
							class={`flex-auto border-t-2 transition duration-500 ease-in-out ${
								checkStepperStyle(2, step).line
							}`}
						>
						</div>
						<div class='flex items-center relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(3, step).icon
								}`}
							>
								<IconUser class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(3, step).text
								}`}
							>
								Info
							</div>
						</div>
						<div
							class={`flex-auto border-t-2 transition duration-500 ease-in-out ${
								checkStepperStyle(3, step).line
							}`}
						>
						</div>
						<div class='flex items-center relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(4, step).icon
								}`}
							>
								<IconDatabase class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(4, step).text
								}`}
							>
								Confirm
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id='stepper' class='container'>
				<Instructions
					id={'instructions'}
					show={step === 1}
					onNext={() => setStep(step + 1)}
				/>
				<Agreement
					id={'agreement'}
					show={step === 2}
					onNext={() => setStep(step + 1)}
				/>
				<ReservationForm
					id={'reservationForm'}
					show={step === 3}
					spot={spot}
					onSubmit={submitReservation}
					onBarangayChange={onBarangayChange}
					onSpotChange={onSpotChange}
					availableSpots={input.availableSpots}
					disabled={input.disabled}
				/>
				<OTPForm
					id={'otpForm'}
					show={step === 4}
					reservation={reservation!}
					onPrev={() => setStep(3)}
					error={input.error}
					onSubmit={submitOTP}
				/>
				<Receipt
					show={step === 5}
					reservation={{
						...reservation,
						spot: props.spot || input.spot,
					} as any}
				/>
			</div>
		</section>
	);
}
