import { Reservation } from '../type.ts';
import IconAlertCircle from 'tablerIcons/alert-circle.tsx';

export default function OTPForm(
	props: {
		id?: string;
		error: boolean;
		reservation: Omit<Reservation, 'id'> & { otp?: string };
		onPrev?: () => void;
		onSubmit?: (e: any) => void;
		show: boolean;
	},
) {
	const succeed = props.id === 'otpFormDone';
	const otpDigits = (props.reservation?.otp || '').split('');
	const btnClass =
		`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-red-300 ${
			props.error
				? 'border-red-700'
				: succeed
				? 'border-green-700'
				: 'border-gray-200'
		}`;

	return (
		<section
			id={props.id}
			class={`relative lg:pt-16 ${props.show ? '' : 'hidden'}`}
		>
			<div class='container w-full mx-auto'>
				<div class='row justify-center'>
					<div class='w-full lg:w-1/2'>
						<div class='section_title text-center pb-6'>
							<h5 class='sub_title'>Confirm</h5>
							<h4 class='main_title'>
								OTP Confirmation
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class='container pl-10 pr-10'>
				<div class='relative flex flex-col justify-center overflow-hidden'>
					<div class='relative bg-white px-6 pt-10 pb-9 mx-auto w-full max-w-lg rounded-2xl border-b shadow-xl'>
						<div class='mx-auto flex w-full max-w-md flex-col space-y-16'>
							<div class='flex flex-col items-center justify-center text-center space-y-2'>
								<div class='font-semibold text-3xl'>
									<p>Email Verification</p>
								</div>
								<div class='flex flex-row text-sm font-medium text-gray-400'>
									<p>
										We have sent a code to your email&nbsp;
										{props.reservation?.email}
									</p>
								</div>
							</div>

							<div>
								<form
									action='/services'
									method='GET'
									onSubmit={props.onSubmit}
								>
									<div class='flex flex-col space-y-16'>
										<div class='flex flex-row items-center justify-between mx-auto w-full max-w-xs'>
											{[1, 2, 3, 4].map((index) => {
												return (
													<div class='w-16 h-16 '>
														<input
															disabled={succeed}
															class={btnClass}
															maxLength={1}
															type='text'
															value={succeed
																? otpDigits[
																	index - 1
																]
																: ''}
															name={succeed
																? undefined
																: `otp${index}`}
														/>
													</div>
												);
											})}
										</div>

										<div class='flex flex-col space-y-5'>
											<div>
												<button class='focus:outline-none flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-500 hover:bg-red-800 border-none text-white text-base font-bold shadow-sm'>
													{succeed
														? 'Go Back to Places'
														: 'Verify'}
												</button>
												<p
													class={`flex flex-row items-center justify-center text-center w-full pt-1 text-sm font-semibold ${
														props.error
															? 'text-red-700'
															: 'text-green-700'
													} ${
														props.error
															? ''
															: 'hidden'
													}`}
												>
													<IconAlertCircle class='w-4 h-4 mr-1' />
													{' '}
													Invalid Email OTP
												</p>
											</div>

											<div
												class={`flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 ${
													succeed ? 'hidden' : ''
												}`}
											>
												<p>Didn't recieve code?</p>{' '}
												<a
													class='flex flex-row items-center text-red-400 hover:text-red-700 hover:font-bold'
													href='http://'
													target='_blank'
													rel='noopener noreferrer'
												>
													Resend
												</a>
											</div>
											<div
												class={`flex flex-row items-center justify-center text-center text-base font-semibold space-x-1 text-gray-500 ${
													succeed ? 'hidden' : ''
												}`}
											>
												<a
													class='cursor-pointer flex flex-row items-center text-red-400 hover:text-red-700 hover:font-bold hover:scale-110 focus:outline-none'
													target='_blank'
													rel='noopener noreferrer'
													onClick={props.onPrev}
												>
													Go Back
												</a>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
