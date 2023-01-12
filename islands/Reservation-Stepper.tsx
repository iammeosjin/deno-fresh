import IconListCheck from 'tablerIcons/list-check.tsx';
import IconListDetails from 'tablerIcons/list-details.tsx';
import IconUser from 'tablerIcons/user.tsx';
import IconDatabase from 'tablerIcons/database.tsx';
import { useState } from 'preact/hooks';
import Instructions from './Instruction.tsx';
import Agreement from './Agreement.tsx';
import ReservationForm from './Reservation-Form.tsx';
import OTPForm from './OTP-Form.tsx';
import { PostListProps } from '../components/PostList.tsx';
import { Reservation } from '../type.ts';
import spots from '../models/spot.ts';

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
	spot?: PostListProps;
}) {
	const [step, setStep] = useState<
		number
	>(1);

	const [input, setInput] = useState<
		{
			error: boolean;
			disabled: boolean;
			spot?: PostListProps;
			availableSpots?: PostListProps[];
		}
	>({ error: false, disabled: !!props.spot });

	const [reservation, setReservation] = useState<
		Reservation & { otp?: string } | null
	>(null);

	const submitReservation = (event: any) => {
		event.preventDefault();

		if (event.target.title.value === 'default') {
			event.target.title.value = '';
		}

		if (!event.target.checkValidity()) {
			event.target.reportValidity();
			return;
		}

		setStep(step + 1);

		setReservation({
			spot: event.target.title.value,
			name: event.target.name.value,
			email: event.target.email.value,
			mobileNumber: event.target.mobileNumber.value,
		});
	};

	const submitOTP = (event: any) => {
		event.preventDefault();

		const otp = [
			event.target.otp1.value,
			event.target.otp2.value,
			event.target.otp3.value,
			event.target.otp4.value,
		].join('');

		if (otp != '1234') {
			setInput({ error: true, disabled: false });
			return;
		}

		setStep(step + 1);
		setReservation({
			...reservation!,
			otp,
		});
	};

	const onBarangayChange = (event: any) => {
		setInput({
			error: false,
			disabled: false,
			spot: undefined,
			availableSpots: spots.filter((spot) =>
				spot.barangay === event.target.value && spot.openForReservations
			),
		});
	};

	const onSpotChange = (event: any) => {
		setInput({
			error: false,
			disabled: false,
			spot: spots.find((spot) => spot.slug === event.target.value),
			availableSpots: input.availableSpots,
		});
	};

	const spot = props.spot || input.spot || undefined;

	return (
		<section class='relative container pb-120'>
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
				<OTPForm
					id={'otpFormDone'}
					show={step === 5}
					reservation={reservation!}
					error={false}
				/>
			</div>
		</section>
	);
}
