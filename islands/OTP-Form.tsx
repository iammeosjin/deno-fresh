export default function OTPForm(
	props: {
		id?: string;
		onNext: () => void;
		show: boolean;
	},
) {
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
										We have sent a code to your email
										ba**@getnada.com
									</p>
								</div>
							</div>

							<div>
								<form action='/services#places' method='GET'>
									<div class='flex flex-col space-y-16'>
										<div class='flex flex-row items-center justify-between mx-auto w-full max-w-xs'>
											<div class='w-16 h-16 '>
												<input
													class='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
													type='text'
													name=''
													id=''
												/>
											</div>
											<div class='w-16 h-16 '>
												<input
													class='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
													type='text'
													name=''
													id=''
												/>
											</div>
											<div class='w-16 h-16 '>
												<input
													class='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
													type='text'
													name=''
													id=''
												/>
											</div>
											<div class='w-16 h-16 '>
												<input
													class='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
													type='text'
													name=''
													id=''
												/>
											</div>
										</div>

										<div class='flex flex-col space-y-5'>
											<div>
												<button class='flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-500 hover:bg-red-800 border-none text-white text-base font-bold shadow-sm'>
													Verify Account
												</button>
											</div>

											<div class='flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500'>
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
