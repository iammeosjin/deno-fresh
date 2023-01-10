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

export default function ReservationStepper(props: {
	spot?: PostListProps;
}) {
	const [state, setState] = useState<
		{ step: number; reservation?: Reservation }
	>({ step: 1 });

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

	if (state.step <= 0) state.step = 1;

	const checkStepperStyle = (index: number, step: number) => {
		if (index === step) return activeStepperStyle;
		if (index < step) return doneStepperStyle;
		return inactiveStepperStyle;
	};

	return (
		<section class='relative container pb-120'>
			<div class='p-5'>
				<div class='mx-4 p-4'>
					<div class='flex items-center'>
						<div class='flex items-center text-teal-600 relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(1, state.step).icon
								}`}
							>
								<IconListDetails class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(1, state.step).text
								}`}
							>
								Guide
							</div>
						</div>
						<div
							class={`flex-auto border-t-2 transition duration-500 ease-in-out ${
								checkStepperStyle(1, state.step).line
							}`}
						>
						</div>
						<div class='flex items-center text-white relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(2, state.step).icon
								}`}
							>
								<IconListCheck class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(2, state.step).text
								}`}
							>
								Privacy Notice
							</div>
						</div>
						<div
							class={`flex-auto border-t-2 transition duration-500 ease-in-out ${
								checkStepperStyle(2, state.step).line
							}`}
						>
						</div>
						<div class='flex items-center relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(3, state.step).icon
								}`}
							>
								<IconUser class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(3, state.step).text
								}`}
							>
								Info
							</div>
						</div>
						<div
							class={`flex-auto border-t-2 transition duration-500 ease-in-out ${
								checkStepperStyle(3, state.step).line
							}`}
						>
						</div>
						<div class='flex items-center relative'>
							<div
								class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
									checkStepperStyle(4, state.step).icon
								}`}
							>
								<IconDatabase class='mx-auto' />
							</div>
							<div
								class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
									checkStepperStyle(4, state.step).text
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
					show={state.step === 1}
					onNext={() => setState({ step: state.step + 1 })}
				/>
				<Agreement
					id={'agreement'}
					show={state.step === 2}
					onNext={() => setState({ step: state.step + 1 })}
				/>
				<ReservationForm
					id={'reservationForm'}
					show={state.step === 3}
					spot={props.spot}
					onNext={(reservation?: Reservation) =>
						setState({ step: state.step + 1, reservation })}
				/>
				<OTPForm
					id={'otpForm'}
					show={state.step === 4}
					reservation={state.reservation!}
					onPrev={() => setState({ step: state.step - 1 })}
				/>
			</div>
		</section>
	);
}
